/**************************************************************************
* ADOBE SYSTEMS INCORPORATED
* Copyright 1998 - 2008 Adobe Systems Incorporated
* All Rights Reserved
*
* NOTICE:  Adobe permits you to use, modify, and distribute this file in accordance with the
* terms of the Adobe license agreement accompanying it.  If you have received this file from a
* source other than Adobe, then your use, modification, or distribution of it requires the prior
* written permission of Adobe.
**************************************************************************/

#ifndef _SoSharedLibDefs_h
#define _SoSharedLibDefs_h

/**
This is the C header file which you need to write DLLs that ExtendScript can
load at runtime.
*/

/**
The list of runtime errors. Errors with negative values are considered fatal
and cannot be caught by Javascript. This is a subset of all possible runtime
errors. Please do not use other error codes.
*/

/** No error */
#define kESErrOK				0
/** Cannot assign value (ReferenceError) */
#define kESErrNoLvalue			3
/** Unterminated string constant (SyntaxError) */
#define kESErrOpenString		4
/** Bad digit in number (SyntaxError) */
#define kESErrBadDigit			6
/** Syntax error (SyntaxError) */
#define kESErrSyntax			8
/** Bad argument list (TypeError) */
#define kESErrBadArgumentList	20
/** Out of memory */
#define kESErrNoMemory			-28
/** Uncaught exception */
#define kESErrException			-29
/** Bad URI (URIError) */
#define kESErrBadURI			31
/** Cannot perform requested action (Error) */
#define kESErrBadAction			32
/** Internal error */
#define kESErrInternal			-33
/** Not yet implemented */
#define kESErrNotImplemented	-36
/** %1 is out of range (RangeError) */
#define kESErrRange				41
/** Evaluation error (EvalError) */
#define kESErrEval				43
/** Cannot convert (TypeError) */
#define kESErrConversion		44
/** Object is invalid (ReferenceError) */
#define kESErrInvalidObject		45
/** Type mismatch (TypeError) */
#define kESErrTypeMismatch		47
/** File or folder does not exist */
#define kESErrNoFile			48
/** File or folder already exists */
#define kESErrFileExists		49
/** I/O device is not open */
#define kESErrNotOpen			50
/** Read past EOF */
#define kESErrEOF				51
/** I/O error */
#define kESErrIO				52
/** Permission denied */
#define kESErrNoPermission		53
/** Cannot resolve reference */
#define kESErrCannotResolve		57
/** I/O Timeout */
#define kESErrIOTimeout			58
/** No response */
#define kESErrNoResponse		59

/**
All data is passed in and out in a tagged data structure. This structure can
hold a few basic data types. If you want to return a string value, you need
to provide a FreeMem() entry point in your DLL so ExtendScript can free the
memory after usage.
Since ExtendScript does not know about the structure packing alignment, please
use a pack alignment of 8. This should be OK for all 32-bit systems.
*/
struct TaggedData_s
{
	union
	{
		long	intval;		/* integer and boolean values	*/
		double	fltval;		/* floating-point values		*/
		char* 	string;		/* string pointers				*/
		long*   hObject;    /* LiveObject                   */
	}			data;
	long		type;		/* the data type tag			*/
	long		filler;		/* a filler for 8-byte align	*/
} ;

typedef struct TaggedData_s TaggedData ;

/** The possible VariantData data types */

/** Undefined means that this value is not defined. ExtendScript passes this
value in if an argument is supplied as "undefined". If a function should not
return any value, the return value is Undefined as well. The return value for
a function is always preset to Undefined.
*/
#define kTypeUndefined	0
/** A boolean value is either interpreted as false (if the value is zero) or
true (if the value is nonzero). The field is intval, the value is 0 or 1.
*/
#define kTypeBool		2
/** A double floating point value (64 bits). The field is fltval.
*/
#define kTypeDouble		3
/** A string value. If you provide a string value, define the entry point
FreeMem() in your DLL so ExtendScript can free your memory after use. Strings
are supposed to be encoded in UTF-8 and to be null-terminated. The field is string,
and if you want ExtendScript to release a returned memory pointer, implement
FreeMem().
*/
#define kTypeString		4
/** An object value is a pointer to a LiveObject. The field is hObject.
A LiveObject pointer returned as a function result is not released
*/
#define kTypeLiveObject 6
/** An object value is a pointer to a LiveObject. The field is hObject.
A LiveObject pointer returned as a function result is released
*/
#define kTypeLiveObjectRelease 7
/** An integer value is a signed 32-bit quantity. The field is intval.
*/
#define kTypeInteger	123
/** An unsigned integer value is an unsigned 32-bit quantity. The field is intval.
*/
#define kTypeUInteger	124
/** A script is an executable string. You can return a script, which causes
ExtendScript to run the returned string as a JavaScript and to return from
the function call with whatever the evaluation of the string returned. The
field is string, and if you want ExtendScript to release a returned memory
pointer, implement FreeMem().
*/
#define kTypeScript		125

#ifdef __cplusplus
extern "C" {
#endif

/** All functions need to be coded in the same way, following the function
definition below. ExtendScript passes in an array of arguments as VariantData,
and supplies a VariantData element preset to Undefined for the return value.
You should return any error code. If the function suceeds, the return value
is kESErrOK.
*/

	typedef long (*ESFunction) (TaggedData* argv, long argc, TaggedData* retval);

/**************** Definitions of standard functions ***********************

If you return a string, implement the following function so ExtendScript
can call this function to release the memory associated with the string.

extern void ESFreeMem (void* p);

If you implement the following function, ExtendScript makes the result of
the function available as the value of the read-only property "version".

extern long ESGetVersion (void);

Initialize the library and return function signatures. If you do not return
function signatures, return an empty string or NULL. This string is not released
by ExtendScript, since it assumes that it it static within the DLL. The arguments
are the remaining arguments of the ExtendScript ExternalObject constructor.

extern char* ESInitialize (TaggedData* argv, long argc);

Terminate the library.

extern void ESTerminate (void);
*/

typedef	  signed long    ESerror_t;

#ifdef __cplusplus
}
#endif



#endif

