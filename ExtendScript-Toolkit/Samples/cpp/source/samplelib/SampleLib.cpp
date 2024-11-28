/**************************************************************************
* ADOBE SYSTEMS INCORPORATED
* Copyright 2007 Adobe Systems Incorporated
* All Rights Reserved
*
* NOTICE:  Adobe permits you to use, modify, and distribute this file in accordance with the
* terms of the Adobe license agreement accompanying it.  If you have received this file from a
* source other than Adobe, then your use, modification, or distribution of it requires the prior
* written permission of Adobe.
**************************************************************************/

/**
 * \file SampleLib.cpp
 * \brief The sample shows how to implement an external object and to extend the JavaScript DOM,
 * showing in particular how to use the object-oriented interface
 * <p>
 * The sample demonstrates the two mechansisms for extending the JavaScript DOM, the direct 
 * interface and the indirect (object-oriented) interface. 
 * <p>
 * Direct Interface:
 * <br>This enables you to expose methods of your shared library as a method in the JavaScript
 * environment.  This allows you to pass simple data types back to JavaScript from the External 
 * Object such as Strings, booleans, integers and scripts.
 * <p>
 * For information on how to call the individual methods from JavaScript, see the comments for each methods or
 * see the loadSampleLib.jsx script file that accompanies this sample.
 * <p>
 * Indirect Interface:
 * <br>This enables you to create new classes of objects in JavaScript with properties and
 * methods. Your Shared Library is called when these methods or properties are used in
 * in JavaScript.  
 *
 * <p>
 * 
 * If you are working with an installed (Release) build of Adobe Bridge CS3,
 * then we recommend you choose the Release configuration of the shared library
 * when testing the SampleLib. You can modify the shared library (Debug or Release) that is loaded
 * in the loadSampleLib.jsx file itself.
 * <p>
 * See the JavaScript Tools Guide for more information on
 *  the direct interface and indirect (object-oriented) interface.
 * 
 * See SoSharedLibDefs.h for error codes and return types
 * 
 * See SoCClient.h for the indirect (object-oriented) interface
 *
 * See \ref sampleprojects for information on how to build the library
 *
 * See \ref installing for information on how to install and use the library
 *
 */

#include "SampleLib.h"
#include "SoSharedLibDefs.h"
#include "SoCClient.h"
#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <math.h>


#if defined (_WINDOWS)
#pragma warning( push )
#pragma warning(disable : 4996) // Security warning about strcpy on win
#define strdup _strdup
#endif

/** This is the version number, and can be modified by setVersion(). */
static long libraryVersionNumber = 1;

/** 
	String string that contains the signatures of every ESFunction defined here,
	used to support the JavaScript reflection interface.
	Note that this is a single comma-separated values string, concatenated
	by the compiler.
*/
static char* signatures =
	"setVersion_d,"			// setVersion (int) 
	"createObject_ss,"	// createObject (string, string)
	"createArray,"			// createArray() 
	"paramAny_a,"				// paramAny (any)
	"paramString_s,"		// paramString (string)
	"paramBool_b,"			// paramBool (bool) 
	"paramUInt32_u,"		// paramUInt (unsigned int)
	"paramInt32_d,"			// paramInt (signed int) 
	"paramFloat64_f"		// paramFloat64 (double)
	"built"							// built() -> string
;

#if MAC
#define unused(a) (void*) a ;
#else
void* unused(void* x){ return x;} ;
#endif

/**
* \brief Returns the version number of the library
*
* ExtendScript publishes this number as the version property of the object 
* created by new ExternalObject.  Used by the direct interface.
*/
extern "C" SAMPLIB long ESGetVersion()
{
	return libraryVersionNumber;
}

/**
* \brief Initialize the library and return function signatures.
*
* These signatures have no effect on the arguments that can be passed to the functions.
* They are used by JavaScript to cast the arguments, and to populate the
* reflection interface.
*/
extern "C" SAMPLIB char* ESInitialize (TaggedData* argv, long argc)
{
	unused(&argv);
	unused(&argc);

	return signatures;
}

/**
* \brief Terminate the library.
*
* Does any necessary clean up that is needed.
*/
extern "C" SAMPLIB void ESTerminate()
{
}

/**
* \brief Free any string memory which has been returned as function result.
* JavaScipt calls this function to release the memory associated with the string.
* Used for the direct interface.
*
* \param *p Pointer to the string
*/
extern "C" SAMPLIB void ESFreeMem (void* p)
{
	if (p)
		free (p);
}


/**
* \brief Allocate some memory.
* Used for the object interface.
*
* \param nBytes The amount of space to allocate
* \return Pointer to the allocated space
*/
extern "C" SAMPLIB void* ESMallocMem (size_t nBytes)
{
	void* p = malloc(nBytes);

	return p ;
}

/**
* \brief Change the version number by setting the global "version".
*
 \code
 myObj.setVersion(2);
 \endcode
* \param argv - The JavaScript argument
* \param argc the argument count
* \param result - The return value to be passed back to JavaScript
*/
extern "C" SAMPLIB long setVersion (TaggedData* argv, long argc, TaggedData* result)
{
	/* to keep compiler warnings from popping up */
	result = NULL;
	if (argc >= 1)
		libraryVersionNumber = argv [0].data.intval;

	return kESErrOK;
}

/**
 * \brief Helper function to "Stringize" each argument. 
 * If the argument is not a string, convert it to a string. 
 * If it is a string, escape all quotes in the string with 
 * a backslash and quote the entire string. 
 * 
 * \param p Pointer to a TaggedData
 * \return Return a dynamic buffer containing the string.
*/
static char* stringize (TaggedData* p)
{
	char* result, *q, *r;
	size_t size;

	char temp [128];

	switch (p->type)
	{
	case kTypeUndefined:
		strcpy (temp, "undefined");
		break;
	case kTypeBool:
		strcpy (temp, (p->data.intval == 0) ? "false" : "true");
		break;
	case kTypeInteger:
		break;
	case kTypeUInteger:
		break;
	case kTypeDouble:
		break;
	}
	if (p->type != kTypeString)
	{
		result = (char*) malloc (strlen (temp) + 1);
		strcpy (result, temp);
	}
	else
	{
		// Strings: count the quote characters inside
		size = 3; // "" plus trailing zero
		for (q = p->data.string; *q; q++)
			size += (*q == '"') ? 2 : 1;
		result = (char*) malloc (size);
		// transfer the string 
		r = result;
		*r++ = '"';
		for (q = p->data.string; *q; )
		{
			if (*q == '"')
				*r++ = '\\';
			*r++ = *q++;
		}
		*r++ = '"';
		*r = 0;
	}
	return result;
}

/**
* \brief Example of a function that takes arguments with a known type (because
* there is a signature for it).  Returns a script that creates a small
* JavaScript object containing one property.
* Argument 1 contains the name of the property, argument 2 contains the value.
* Return a script that creates an object: "({ 'name':'value' })".
*
* If the arguments are not correct then a bad argument error code is returned.
*
* \param argv - The JavaScript argument
* \param argc the argument count
* \param result The return value to be passed back to JavaScript
*/
extern "C" SAMPLIB long createObject (TaggedData* argv, long argc, TaggedData* result)
{
	char* script, *arg1, *arg2;

	if (argc >= 2)
	{
		// Stringize both arguments.
		arg1 = stringize (&argv [0]);
		arg2 = stringize (&argv [1]);
		// Create the script.
		script = (char*) malloc (strlen (arg1) + strlen (arg2) + strlen ("({'':''})") + 1);
		result->data.string = script;
		result->type = kTypeScript;
		// clean up
		free (arg1);
		free (arg2);
		return kESErrOK;
	}
	else
		// We need at least two arguments.
		return kESErrBadArgumentList;
}

/*
* \brief Example of a function that takes an arbitrary number of arguments of any type.
* 
* This function creates a script that contains a JavaScript array. It stringizes
* every argument and creates a comma separated list surrounded by square brackets.
*
* \param argv - The JavaScript argument
* \param argc the argument count
* \param retval The return value to be passed back to JavaScript
*/
extern "C" SAMPLIB long createArray (TaggedData* argv, long argc, TaggedData* result)
{
	int i;
	size_t size;
	char* script, **stringArgs;

	// Create the string argument array - we need to stringize each argument
	stringArgs = (char**) malloc (argc * sizeof (char*));
	for (i = 0; i < argc; i++)
		stringArgs [i] = stringize (&argv [i]);

	// Determine the size of the needed return buffer 
	size = 3;	/* [] plus the trailing zero */
	for (i = 0; i < argc; i++)
		size += strlen (stringArgs [i]) + 1; // plus a comma

	// Create the script
	script = (char*) malloc (size);
	strcpy (script, "[");
	for (i = 0; i < argc; i++)
	{
		if (i > 0)
			strcat (script, ",");
		strcat (script, stringArgs [i]);
	}
	strcat (script, "]");
	result->data.string = script;
	result->type = kTypeScript;

	// clean up
	for (i = 0; i < argc; i++)
		free (stringArgs [i]);
	free (stringArgs);

	return kESErrOK;
}

/**
* \brief Example of a function that takes an argument of any type.
* 
* If the arguments are not correct then a bad argument error code is returned.
*
* \param argv - The JavaScript argument
* \param argc - the argument count
* \param result - The return value to be passed back to JavaScript
*/
extern "C" SAMPLIB long paramAny (TaggedData* argv, long argc, TaggedData* result)
{
	int errval = kESErrOK;

	if (1 != argc)
		return kESErrBadArgumentList;

	result->type = argv[0].type;

	switch (argv[0].type)
	{
	case kTypeUndefined:
		break;
	case kTypeBool:
	case kTypeInteger:
	case kTypeUInteger:
		result->data.intval = argv[0].data.intval;
		break;
	case kTypeDouble:
		result->data.fltval = argv[0].data.fltval;
		break;
	case kTypeString:
		result->data.string = (char*) malloc (strlen (argv[0].data.string) + 1);
		if ( NULL != result->data.string )
		{
			strcpy (result->data.string, argv[0].data.string);
		}
		else
		{
			errval = kESErrNoMemory;
		}
		break;
	default:
		errval = kESErrTypeMismatch;
		break;
	}

	return errval;
}

/**
* \brief Example of a function that takes a boolean argument.
*
* If the arguments are not correct then a bad argument error code is returned.
*
* \param argv - The JavaScript argument
* \param argc the argument count
* \param result - The return value to be passed back to JavaScript
*/
extern "C" SAMPLIB long paramBool (TaggedData* argv, long argc, TaggedData* result)
{
	int errval = kESErrOK;

	// Method requires 1 and only 1 argument
	if (1 != argc)
		return kESErrBadArgumentList;

	// If the value undefined is passed in, its value is
	// not converted to the specified type.
	if ( kTypeUndefined != argv[0].type )
	{
		if ( kTypeBool == argv[0].type )
		{
			result->type = kTypeBool;
			result->data.intval = argv[0].data.intval;
		}
		else
		{
			errval = kESErrTypeMismatch;
		}
	}

	return errval;
}

/**
* \brief Example of a function that takes an unsigned integer argument.
*
* If the correct number of argument are not passed then a bad argument error code is returned.
* If the argument is not of the correct type then a data mismatch error is returned.
*
* \param argv - The JavaScript argument
* \param argc the argument count
* \param result - The return value to be passed back to JavaScript
*/
extern "C" SAMPLIB long paramUInt32 (TaggedData* argv, long argc, TaggedData* result)
{
	int errval = kESErrOK;

	if (1 != argc)
		return kESErrBadArgumentList;

	if ( kTypeUndefined != argv[0].type )
	{
		if ( kTypeUInteger == argv[0].type )
		{
			result->type = kTypeUInteger;
			result->data.intval = argv[0].data.intval;
		}
		else
		{
			errval = kESErrTypeMismatch;
		}
	}

	return errval;
}

/**
* \brief Example of a function that takes a signed integer argument.
*
* If the correct number of argument are not passed then a bad argument error code is returned.
* If the argument is not of the correct type then a data mismatch error is returned.
*
* \param argv - The JavaScript argument
* \param argc - The argument count
* \param result - The return value to be passed back to JavaScript
*/
extern "C" SAMPLIB long paramInt32 (TaggedData* argv, long argc, TaggedData* result)
{
	int errval = kESErrOK;

	if (1 != argc)
		return kESErrBadArgumentList;

	if ( kTypeUndefined != argv[0].type )
	{
		if ( kTypeInteger == argv[0].type )
		{
			result->type = kTypeInteger;
			result->data.intval = argv[0].data.intval;
		}
		else
		{
			errval = kESErrTypeMismatch;
		}
	}

	return errval;
}

/**
* \brief Example of a function that takes an 64 bit floating point argument.
*
* If the correct number of argument are not passed then a bad argument error code is returned.
* If the argument is not of the correct type then a data mismatch error is returned.
*
* \param argv - The JavaScript argument
* \param argc the argument count
* \param result - The return value to be passed back to JavaScript
*/
extern "C" SAMPLIB long paramFloat64 (TaggedData* argv, long argc, TaggedData* result)
{
	int errval = kESErrOK;

	if (1 != argc)
		return kESErrBadArgumentList;

	if ( kTypeUndefined != argv[0].type )
	{
		if ( kTypeDouble == argv[0].type )
		{
			result->type = kTypeDouble;
			result->data.fltval = argv[0].data.fltval;
		}
		else
		{
			errval = kESErrTypeMismatch;
		}
	}

	return errval;
}

/**
* \brief Example of a function that takes a string argument.
* 
* If the correct number of argument are not passed then a bad argument error code is returned.
* If the argument is not of the correct type then a data mismatch error is returned.
* If memory has not been allocated correctly then returns an out of memory error.
*
* \param argv - The JavaScript argument
* \param argc the argument count
* \param result - The return value to be passed back to JavaScript
*/
extern "C" SAMPLIB long paramString (TaggedData* argv, long argc, TaggedData* result)
{
	int errval = kESErrOK;

	if (1 != argc)
		return kESErrBadArgumentList;

	if ( kTypeUndefined != argv[0].type )
	{
		if ( kTypeString == argv[0].type )
		{
			result->type = kTypeString;
			result->data.string = (char*) malloc (strlen (argv[0].data.string) + 1);
			if ( NULL == result->data.string )
			{
				errval = kESErrNoMemory;
			}
			else
			{
				strcpy( result->data.string, argv[0].data.string );
			}
		}
		else
		{
			errval = kESErrTypeMismatch;
		}
	}

	return errval;
}

/**
* \brief Example of a function that returns a string
*
* If memory has not been allocated correctly then returns an out of memory error.
*
* \param argv - The JavaScript argument
* \param argc the argument count
* \param result The return value to be passed back to JavaScript
*/
extern "C" SAMPLIB long built(TaggedData* argv, long argc, TaggedData* result)
{
	int errval = kESErrOK;
	char sResult[1000] ;

	if  ( strlen(__DATE__) + strlen(__TIME__) < (sizeof(sResult)-10) )  {

		sResult[0] = 0 ;
		strcpy(sResult,__DATE__) ;
		strcat(sResult," ") ;
		strcat(sResult,__TIME__) ;

		result->type = kTypeString;
		result->data.string = strdup(sResult) ;
		if ( !result->data.string ) errval = kESErrNoMemory;
	} else {
		errval = kESErrNoMemory ;
	}

	unused(&argv) ;
	unused(&argc) ;

	return errval;
}

// ------------------------------------------------
// START SampleLibObject                          

// Statics

/**
	Array of function pointers to communiate use of the new class
*/
SoObjectInterface*	gpObjectInterface	= NULL	;

/**
	Structure of function pointers which enable the client to call JavaScript
*/
SoServerInterface*	gpServer			= NULL	;

/**
	The server object
*/
SoHServer			ghServer			= NULL	;

/**
	Counter for instances created
*/
int					ME					= 0		;

struct myData_s
{
	TaggedData	a   ; // value of property a
	TaggedData	b   ; // value of property b
	int			me	;			// unique identifier for this instance
} ;

typedef struct myData_s  myData_t ;
typedef        myData_t* myData_p ;

// prototypes
ESerror_t objectInitialize(SoHObject hObject,int argc,TaggedData* argv) ;
ESerror_t objectGet       (SoHObject hObject,SoCClientName* name,TaggedData* pResult) ;
ESerror_t objectPut       (SoHObject hObject,SoCClientName* name,TaggedData* pValue) ;
ESerror_t objectCall      (SoHObject hObject,SoCClientName* name,int argc,TaggedData* argv,TaggedData* pResult) ;
ESerror_t objectToString  (SoHObject hObject,TaggedData* pResult) ;
ESerror_t objectValueOf   (SoHObject hObject,TaggedData* pResult) ;
ESerror_t objectFinalize  (SoHObject hObject) ;

/**
* \brief Called whenever a ne object is constructed
*
	\code
	var myObj = new SampleObject(param1);
	\endcode
*
* \param hObject - The reference for this instance
* \param argc - The argument count
* \param argv - The arguments passed in the constructor
*/
ESerror_t objectInitialize(SoHObject hObject,int argc, TaggedData* argv)
{

	// An array of SoCClientName structures representing 
	// the methods of this object
	SoCClientName Methods[] =
	{   {	"reverse"	, 0 , NULL	}
	,	{	"sine"		, 0 , NULL	}
	,   { NULL }
	} ;

	// An array of SoCClientName structures representing 
	// the properties of this object
	SoCClientName Properties[] =
	{	{	"a"			, 0 , NULL	}
	,	{	"b"			, 0 , NULL	}
	,	{	"pi"		, 0 , NULL	}
	,	{	"me"		, 0 , NULL	}
	,	{	"built"		, 0 , NULL	}
	,   {   NULL }
	} ;

	size_t   size    = sizeof(myData_t) ;
	myData_p pMyData = NULL  ;

	unused(&argc) ;
	unused( argv) ;

	pMyData = (myData_p)(malloc(size))   ;

	memset  (pMyData,0,size) ;
	pMyData->me = ++ME        ;
	gpServer->taggedDataInit(hObject,&pMyData->a) ;
	gpServer->taggedDataInit(hObject,&pMyData->b) ;
	gpServer->setClientData(hObject,pMyData) ;

	gpServer->addProperties(hObject,Properties) ;
	gpServer->addMethods   (hObject,Methods   ) ; 

	return kESErrOK ;
}

/**
* \brief Retrieves the value of a property of this object
*
* \param hObject - The reference for this instance
* \param name - The name of the property
* \param pResult - Pointer to the result being returned to JavaScript
*/
ESerror_t objectGet(SoHObject hObject,SoCClientName* name,TaggedData* pResult)
{
	ESerror_t error = kESErrOK ;

	myData_p pMyData = NULL ;
	gpServer->getClientData(hObject,(void**)&pMyData);


	if ( strcmp(name->name_sig,"a") == 0 )
	{
		*pResult = pMyData->a ;
		if ( pResult->type == kTypeString ) pResult->data.string = strdup(pResult->data.string) ;
	}

	else if ( strcmp(name->name_sig,"b") == 0 )
	{
		*pResult = pMyData->b ;
		if ( pResult->type == kTypeString ) pResult->data.string = strdup(pResult->data.string) ;
	}

	else if ( strcmp(name->name_sig,"pi") == 0 )
	{
		pResult->type = kTypeDouble ;
		pResult->data.fltval = atan2(1.0,1.0) * 4.0 ;
	}

	else if ( strcmp(name->name_sig,"built") == 0 )
	{
		error = built(NULL,0,pResult) ;
	} 

	else if ( strcmp(name->name_sig,"me") == 0 )
	{
		pResult->type = kTypeInteger ;
		pResult->data.intval = pMyData->me ;
	}

	return error ;
}

/**
* \brief Sets a value of a property of this object
*
* \param hObject - The reference for this instance
* \param name - The name of the property to update
* \param pValue - A pointer to the value to write to the property
*/
ESerror_t objectPut(SoHObject hObject,SoCClientName* name,TaggedData* pValue)
{
	myData_p    pMyData = NULL ;

	gpServer->getClientData(hObject,(void**)&pMyData);

	if ( strcmp(name->name_sig,"a") == 0 )
	{
		pMyData->a = *pValue ;
		if ( pMyData->a.type == kTypeString ) pMyData->a.data.string = strdup(pMyData->a.data.string) ;
	}
	else if ( strcmp(name->name_sig,"b") == 0 )
	{
		pMyData->b = *pValue ;
		if ( pMyData->b.type == kTypeString ) pMyData->b.data.string = strdup(pMyData->b.data.string) ;
	}


	return 0 ;
}

/**
* \brief Calls a method of this object
*
* \param hObject - The reference for this instance
* \param name - The name of the method to call
* \param argv - The JavaScript argument
* \param argc - The argument count
* \param pResult - The return value to be passed back to JavaScript
*/
ESerror_t objectCall(SoHObject hObject,SoCClientName* name,int argc,TaggedData* argv,TaggedData* pResult)
{
	ESerror_t result          = kESErrOK ;
	int       bReverse        = strcmp(name->name_sig,"reverse"	) == 0 ;
	int       bSine           = strcmp(name->name_sig,"sine"	) == 0 ;

	int       type = argc == 1 ? argv[0].type : kTypeUndefined ;

	unused(hObject) ;

	if ( bSine ) { 

		if		( argc != 1 ) 
			result =  kESErrBadArgumentList ;
		else if	( type != kTypeDouble && type != kTypeInteger  )
			result =  kESErrTypeMismatch ;
		else
		{
			double      angle  = type == kTypeDouble ? argv[0].data.fltval : (double) argv[0].data.intval ;
			double      pi     = 4.0 * atan2(1.0,1.0) ;
			double      radian = 180.0 / pi ;
			angle              = angle / radian ;
			pResult->data.fltval = sin(angle) ;
			pResult->type        = kTypeDouble ;
		}
	}

	else if ( bReverse ) {

		if		( argc != 1 ) 
			result =  kESErrBadArgumentList ;
		else if	( type != kTypeString )
			result =  kESErrTypeMismatch ;
		else
		{
			size_t i ;
			size_t l ;
			pResult->type   = kTypeString ;
			pResult->data.string = strdup(argv[0].data.string) ;
			l  = strlen(pResult->data.string) ;
			for ( i = 0 ; i < l/2 ; i ++ ) {
				char t = pResult->data.string[i] ;
				pResult->data.string[i] = pResult->data.string[l-i-1] ;
				pResult->data.string[l-i-1] = t                       ;
			}
		}
	}

	return result ;
}

/**
 * Not used in this sample.  To implement, change from NULL to objectToString
 * in array of SoObjectInterface. 
 * 
 * \see objectInterface
*/
ESerror_t objectValueOf(SoHObject hObject,TaggedData* pResult)
{
	myData_p    pMyData = NULL ;
	gpServer->getClientData(hObject,(void**)&pMyData);

	pResult->type = kTypeString ;
	pResult->data.string = strdup("objectValueOf:: this is the value") ;
	return   kESErrOK ;

}

/**
 * Not used in this sample.  To implement, change from NULL to objectToString
 * in array of SoObjectInterface. 
 * 
 * \see objectInterface
*/
ESerror_t objectToString(SoHObject hObject,TaggedData* pResult)
{
	myData_p    pMyData = NULL ;
	gpServer->getClientData(hObject,(void**)&pMyData);

	pResult->type = kTypeString ;
	pResult->data.string = strdup("objectToString::Object") ;
	return   kESErrOK ;
}

/**
* \brief Calls when the object is released from memory.
*
* \param hObject - The reference for this instance
*/
ESerror_t objectFinalize(SoHObject hObject)
{
	myData_p pMyData = NULL ;
	gpServer->getClientData(hObject,(void**)&pMyData);
	if (  pMyData ) {
		if ( pMyData->a.type == kTypeString ) free((void*)pMyData->a.data.string) ;
		if ( pMyData->b.type == kTypeString ) free((void*)pMyData->b.data.string) ;
		free(pMyData) ;
		gpServer->setClientData(hObject,NULL) ;
	}
	return kESErrOK ;
}

/**
* Array of SoObjectInterface.
* Provides the interface which is used by JavaScript to 
* communicate the use of the object
*/
SoObjectInterface objectInterface =
{  objectInitialize
,  objectPut
,  objectGet
,  objectCall
,  NULL  /* objectValueOf  */
,  NULL  /* objectToString */
,  objectFinalize
} ;

/* ESClientInterface - optional call to support ExternalObject Object Interface */
extern "C" SAMPLIB int  ESClientInterface (SoCClient_e kReason,SoServerInterface* pServer,SoHServer hServer)
{
	if ( !gpObjectInterface ) {
		gpObjectInterface = &objectInterface ;
	}
	ghServer = hServer ;

	switch ( kReason )
	{
	case kSoCClient_init : {
		gpServer  = pServer ;
		ghServer  = hServer ;

		gpServer->addClass  (hServer,"SampleLibObject",&objectInterface) ;
		return 0 ;
												 } break ;

	case kSoCClient_term : {
		ME = 0   ;
		return 0 ;
												 } break ;
	}

	return 0 ;
}

#if defined (_WINDOWS)
#pragma warning( pop )
#endif

// END of SampleLibObject                           
// ------------------------------------------------ 

