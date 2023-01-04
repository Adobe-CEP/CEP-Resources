/**************************************************************************
* ADOBE SYSTEMS INCORPORATED
* Copyright 2008 Adobe Systems Incorporated
* All Rights Reserved
*
* NOTICE:  Adobe permits you to use, modify, and distribute this file in accordance with the
* terms of the Adobe license agreement accompanying it.  If you have received this file from a
* source other than Adobe, then your use, modification, or distribution of it requires the prior
* written permission of Adobe.
**************************************************************************/

/**
 * \file BasicExternalObject.cpp
 * \brief The sample shows how to implement a basic external object and to extend the JavaScript DOM.
 *
 * The sample demonstrates how to pass simple data types back to JavaScript from the External Object
 * such as Strings, booleans, integers and scripts.
 * 
 * All of the exported functions that are available to JavaScript take 3 arguments:
 *
 * \li An array of variant data.
 * \li An argument count.
 * \li A variant data structure that takes the return value.
 * 
 * The variant data is of type TaggedData, which represents a JavaScript argument.  The
 * supported data types for TaggedData are:
 *
 * \li Undefinied
 * \li Boolean
 * \li Double
 * \li String
 * \li Script
 *
 * For information on how to call the individual methods then see the comments for each methods or
 * see the loadExternalObject.jsx script file that accompanies this sample.
 *
 * See SoSharedLibDefs.h for error codes and return types
 *
 * See \ref sampleprojects for information on how to build the library
 *
 * See \ref installing for information on how to install and use the library
 *
 */

#include "BasicExternalObject.h"
#include "SoSharedLibDefs.h"
#include <string>

#if defined (_WINDOWS)
	#pragma warning(disable : 4996) // Turn off warning about deprecated strcpy on Win
#endif

/**
* \brief To allow string manipulation
*/
using namespace std;

/**
* \brief Utility function to handle strings and memory clean up
*
* \param s - The referenced string
*/
static char* getNewBuffer(string& s)
{
	// Dynamically allocate memory buffer to hold the string 
	// to pass back to JavaScript
	char* buff = new char[1+s.length()];
	
	memset(buff, 0, s.length()+1);
	strcpy(buff, s.c_str());

	return buff;
}

/**
* \brief Create a three-element array as a script and returns that array.
*
* The return type is set to kTypeScript so when the string is returned to the 
* scripting engine it will be evaluated and ran as a script. From JavaScript 
* this methods accept zero arguments:
*
 \code
 myObj.makeArray();
 \endcode
* 
* If the arguments are not correct then a bad argument error code is returned.
*
* \param argv - The JavaScript argument
* \param argc the argument count
* \param retval The return value to be passed back to JavaScript
*/
extern "C" BASICEXTERNALOBJECT_API long makeArray(TaggedData* argv, long argc, TaggedData * retval) {

	// accept no arguments
	if(argc != 0)
	{
		return kESErrBadArgumentList;
	}

	// The returned value type
	retval->type = kTypeScript;
	
	string s ("[1, 2, 3]");

	retval->data.string = getNewBuffer(s);
	
	return kESErrOK;
}

/**
* Computes the average of passed integers.
*
* From JavaScript, this function can be called with any number of arguments.
* The passed arguments must be numbers and not strings.  To call from JavaScript:
*
 \code
 myObj.average(10, 20, 30);
 \endcode
*
* If the arguments are not correct then a bad argument error code is returned.
*
* \param argv - The JavaScript argument
* \param argc the argument count
* \param retval The return value to be passed back to JavaScript
*/
extern "C" BASICEXTERNALOBJECT_API long getAverage(TaggedData* argv, long argc, TaggedData* retval)
{

	// Return an error if we do not get what we expect
	if(argv[0].type != kTypeDouble)
	{
		return kESErrBadArgumentList;
	}

	double sum = 0.0;
	int i;
	for (i = 0; i < argc; i++)
	{
		sum += argv [i].data.fltval; 
	}

	retval->type = kTypeDouble;
	retval->data.fltval = sum / argc;
	return kESErrOK;
}

/**
* Appends a string onto the passed argument.
*
* This function only accepts a single argument, a String.  The passed argument
* is appended with another string and then returned back to the scripting environment.
* To call from JavaScript:
*
 \code
 myObj.appendString("A String");
 \endcode
*
* If the arguments are not correct then a bad argument error code is returned.
*
* \param argv - The JavaScript argument
* \param argc the argument count
* \param retval The return value to be passed back to JavaScript
*/
extern "C" BASICEXTERNALOBJECT_API long appendString(TaggedData* argv, long argc, TaggedData * retval)
{	
	// Accept 1 and only 1 argument
	if(argc != 1)
	{
		return kESErrBadArgumentList;
	}

	// The argument must be a string
	if(argv[0].type != kTypeString)
	{
		return kESErrBadArgumentList;
	}

	// The returned value type
	retval->type = kTypeString;

	// argv[0].data.string = the string passed in from the script
	string s (argv[0].data.string);
	
	// add a little bit of data onto the passed in string
	s.append("_appended by BasicExternalObject");

	retval->data.string = getNewBuffer(s);

	return kESErrOK;
}

/**
* \brief Returns a script that creates a new dialog window within the ESTK.
*
* The return type is set to kTypeScript so when the string is returned to the 
* scripting engine it will be evaluated and ran as a script.  The return script
* creates a new dialog window named 'Externalobject' with a 'OK' button that when clicked closes the connection
* between the jsx and ExternalObject.
*
* Function accepts any number of parameters of any data type but will ignore them.
* To call from JavaScript:
*
 \code
 myObj.myScript();
 \endcode
*
* \param argv - The JavaScript argument
* \param argc the argument count
* \param retval The return value to be passed back to JavaScript
*/
extern "C" BASICEXTERNALOBJECT_API long myScript(TaggedData* argv, long argc, TaggedData* retval)
{
	
	// The returned value type
	retval->type = kTypeScript;

	// Create a script to be run
	string s ("var dlg = new Window('dialog', 'Externalobject');");
	// create a button for the dialog
	s.append("dlg.btn = dlg.add('button', undefined, 'OK');");
	s.append("dlg.btn.onClick = function(){");
	s.append("$.writeln('LoadBasicExternalObject: closing and unloading ExternalObject');");
	s.append("basiceo.unload();");
	s.append("dlg.close();}");
	s.append("dlg.show();");
	
	retval->data.string = getNewBuffer(s);

	return kESErrOK;
}

/**
* \brief accepts a single parameter of true or false.
*
* This methods returns a string to JavaScript describing the value
* that was passed in as an argument.  To call from JavaScript:
*
 \code
 myObj.acceptBoolean(true);
 \endcode
*
* If the arguments are not correct then a bad argument error code is returned.
*
* \param argv - The JavaScript argument
* \param argc the argument count
* \param retval The return value to be passed back to JavaScript
*/
extern "C" BASICEXTERNALOBJECT_API long acceptBoolean(TaggedData* argv, long argc, TaggedData* retval)
{
	if((argv[0].type != kTypeBool) && (argc != 1))
	{
		return kESErrBadArgumentList;
	}

	string s;
	retval->type = kTypeString;

	if(argv[0].data.intval)
	{
		s.append("Accepted a value of TRUE");
	}
	else
	{
		s.append("Accepted a value of FALSE");
	}

	retval->data.string = getNewBuffer(s);

	return kESErrOK;

}

/**
* \brief Free any string memory which has been returned as function result.
*
* \param *p Pointer to the string
*/
extern "C" BASICEXTERNALOBJECT_API void ESFreeMem (void* p)
{ 
	delete(char*)(p);
}

/**
* \brief Returns the version number of the library
*
* ExtendScript publishes this number as the version property of the object 
* created by new ExternalObject.
*/
extern "C" BASICEXTERNALOBJECT_API long ESGetVersion()
{
	return 0x1;
}

/**
* \brief Initialize the library and return function signatures.
*
* These signatures have no effect on the arguments that can be passed to the functions.
* They are used by JavaScript to cast the arguments, and to populate the
* reflection interface.
*/
extern "C" BASICEXTERNALOBJECT_API char* ESInitialize (const TaggedData ** argv, long argc) 
{ 
	return "makeArray,getAverage,appendString_s,myScript_a,acceptBoolean_b";
}

/**
* \brief Terminate the library.
*
* Does any necessary clean up that is needed.
*/
extern "C" BASICEXTERNALOBJECT_API void ESTerminate()
{
	
}