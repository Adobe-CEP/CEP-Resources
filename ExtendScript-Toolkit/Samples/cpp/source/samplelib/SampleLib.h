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
 * \file SampleLib.h
 * \brief Header file for the SampleLib. 
 */


/*
Create definitions to auto-export the functions in this DLL.
This works well for Windows, the Mac and HP/UX. For Linux
and Solaris, export everything, and for AIX, create an export
definition file. You will need to add the constants for Unix
operating systems to your makefile.
*/
#if defined (_WINDOWS) || defined (HPUX_ACC)
#define SAMPLIB __declspec(dllexport)
#elif defined(__APPLE__)
#define SAMPLIB __attribute__((visibility("default")))
#elif defined (LINUX) || defined (SOLARIS) || defined (AIX_VACPP6)
#define DLL_EXPORT
/* fine, just create the exports file for AIX
   you will have to link your app with dl.so
   so you can resolve dlopen, dlclose and dlsym.
*/
#else
#error Unsupported compiler
#endif



