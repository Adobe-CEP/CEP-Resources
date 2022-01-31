#ifdef PUBLIC
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
#else
/**************************************************************************
* $File: //depot/devtech/internal/home/lesavage/Projects/Extend Script/cpp/source/include/SoCClient.h $
* $Author: lesavage $
* $DateTime: 2008/03/14 03:43:03 $
* $Revision: #2 $
* $Change: 600764 $
*
* ADOBE CONFIDENTIAL
* ___________________
*
*  Copyright 1998 - 2008 Adobe Systems Incorporated
*  All Rights Reserved.
*
* NOTICE:  All information contained herein is, and remains the property of
* Adobe Systems Incorporated  and its suppliers,  if any.  The intellectual
* and technical concepts contained herein are proprietary to  Adobe Systems
* Incorporated  and its suppliers  and may be  covered by U.S.  and Foreign
* Patents,patents in process,and are protected by trade secret or copyright
* law.  Dissemination of this  information or reproduction of this material
* is strictly  forbidden  unless prior written permission is  obtained from
* Adobe Systems Incorporated.
**************************************************************************/
#endif

#if SC_ONCE
#pragma once
#endif

#ifndef _SoCClient_h
#define _SoCClient_h

#ifndef PUBLIC
#include <stddef.h>
#include "SoSharedLibDefs.h"
#endif

#ifdef __cplusplus
extern "C" {
#endif

#ifndef PUBLIC
/**
This is the interface to enable C Clients to manage and use LiveObjects
<p>Further information is available from TechNote: ES0018-CClientLibrary</p>
*/
#endif

/* ----------------------------------------------------------- */
/* blind pointers (C reference to server and objects)          */
/* ----------------------------------------------------------- */
/**
Blind pointers to C++ objects for use from C
@param	SoHServer		The Server object
@param	SoHObject		A LiveObject
*/
typedef long* SoHServer ;
typedef long* SoHObject ;


/* ----------------------------------------------------------- */
/* SoCClientName                                               */
/* ----------------------------------------------------------- */
/**
SoCClientName	Data structure to define a method or property
@param	name_sig		The name and signature of the method/property
@param	id				A unique ID for the method/property (or zero)
@param	desc			A description of property (or NULL)
*/
struct SoCClientName_s
{
	const char* name_sig ;
	int			id       ;
	char*       desc     ;
};
typedef struct SoCClientName_s SoCClientName   ;
typedef SoCClientName*         SoCClientName_p ;


/* ----------------------------------------------------------- */
/* memory callbacks                                            */
/* ----------------------------------------------------------- */
/**
Memory allocation and free functions
@param	SoMemoryMalloc_f	memory allocation
@param	SoMemoryFree_f		memory free
*/

typedef void* (*SoMemoryMalloc_f)(size_t) ;
typedef void  (*SoMemoryFree_f)  (void*)  ;
struct SoMemoryInterface_s
{
  SoMemoryMalloc_f malloc ;
  SoMemoryFree_f   free   ;
} ;
typedef struct SoMemoryInterface_s SoMemoryInterface   ;
typedef        SoMemoryInterface*  SoMemoryInterface_p ;


/* ----------------------------------------------------------- */
/* Object callbacks                                            */
/* ----------------------------------------------------------- */
/**
Object callbacks.  ES will call your functions when required by JavaScript
@param	SoObjectInitialize_f	JS: new MyObject(....)
@param	SoObjectGet_f			JS: myObject.property
@param  SoObjectPut_f			JS: myObject.property = value
@param	SoObjectCall_f			JS: myObject.method()
@param	SoObjectValueOf_f		JS: myObject.valueOf()
@param  SoObjectToString_f		JS: myObject.toString()
@param  SoObjectFinalize_f		-- object is being destroyed -- (eg lib.unload for ExternalLibrary)
*/
typedef ESerror_t (*SoObjectInitialize_f)( SoHObject hObject, int argc,TaggedData* argv) ;
typedef ESerror_t (*SoObjectGet_f       )( SoHObject hObject, SoCClientName* name,TaggedData*  pValue) ;
typedef ESerror_t (*SoObjectPut_f       )( SoHObject hObject, SoCClientName* name, TaggedData* pValue) ;
typedef ESerror_t (*SoObjectCall_f      )( SoHObject hObject, SoCClientName* name,int argc,TaggedData* argv,TaggedData* pResult) ;
typedef ESerror_t (*SoObjectValueOf_f   )( SoHObject hObject, TaggedData* pResult) ;
typedef ESerror_t (*SoObjectToString_f  )( SoHObject hObject, TaggedData* pResult) ;
typedef ESerror_t (*SoObjectFinalize_f  )( SoHObject hObject) ;

typedef struct SoObjectInterface_s
{
  SoObjectInitialize_f    initialize    ;
  SoObjectPut_f           put           ;
  SoObjectGet_f           get           ;
  SoObjectCall_f          call          ;
  SoObjectValueOf_f       valueOf       ;
  SoObjectToString_f      toString      ;
  SoObjectFinalize_f      finalize      ;
} SoObjectInterface, *SoObjectInterface_p ;

/* ----------------------------------------------------------- */
/* Server callbacks                                            */
/* ----------------------------------------------------------- */

typedef struct SoServerInterface_s SoServerInterface   ;
typedef        SoServerInterface*  SoServerInterface_p ;

typedef void*     (*SoServerMalloc_f        )(SoHServer hServer,size_t nBytes ) ;
typedef void      (*SoServerFree_f          )(SoHObject hObject,void*  pMem   ) ;
typedef ESerror_t (*SoServerDumpServer_f    )(SoHServer hServer ) ;
typedef ESerror_t (*SoServerDumpObject_f    )(SoHObject hObject ) ;
typedef ESerror_t (*SoServerAddClass_f      )(SoHServer hServer,char* name,SoObjectInterface_p objectInterface) ;
typedef ESerror_t (*SoServerAddMethod_f     )(SoHObject hObject,const char* name,int id,char* desc) ;
typedef ESerror_t (*SoServerAddMethods_f    )(SoHObject hObject,SoCClientName_p pNames            ) ;
typedef ESerror_t (*SoServerAddProperty_f   )(SoHObject hObject,const char* name,int id,char* desc) ;
typedef ESerror_t (*SoServerAddProperties_f )(SoHObject hObject,SoCClientName_p pNames            ) ;
typedef ESerror_t (*SoServerGetClass_f      )(SoHObject hObject,char* name,int name_l             ) ;
typedef ESerror_t (*SoServerGetServer_f     )(SoHObject hObject,SoHServer* phServer   ,SoServerInterface_p* ppServerInterface) ;
typedef ESerror_t (*SoServerSetClientData_f )(SoHObject hObject,void*      pClientData) ;
typedef ESerror_t (*SoServerGetClientData_f )(SoHObject hObject,void**    ppClientData) ;
typedef ESerror_t (*SoServerEval_f          )(SoHObject hServer,char* string,TaggedData* pTaggedData) ;
typedef ESerror_t (*SoServerTaggedDataInit_f)(SoHObject hServer,TaggedData* pTaggedData) ;
typedef ESerror_t (*SoServerTaggedDataFree_f)(SoHServer hServer,TaggedData* pTaggedData) ;
#ifndef PUBLIC
typedef ESerror_t (*SoServerCallLiveObject_f)(SoHServer hServer,SoHObject hObject,char* method,int argc,TaggedData* argv,TaggedData* pResult) ;
typedef ESerror_t (*SoServerGetLiveObject_f )(SoHServer hServer,SoHObject hObject,char* method,TaggedData* pResult) ;
typedef ESerror_t (*SoServerPutLiveObject_f )(SoHServer hServer,SoHObject hObject,char* method,TaggedData* pValue ) ;
#else
typedef ESerror_t (*SoReserved_f)(void) ;
#endif

/**
You may call this interface to communicate with ExtendScript
@param	SoServerDumpServer_f		Dump the server to stdout (debugging function)
@param	SoServerDumpObject_f		Dump the object to stdout (debugging function)
@param	SoServerAddClass_f			Add a new Class of ExtendScript Objects
@param	SoServerAddMethod_f			Add a method to an object instance
@param	SoServerAddMethods_f		Add methods to an object instance
@param	SoServerAddProperty_f		Add a property to an object instance
@param	SoServerAddProperties_f		Add properties to an object instance
@param	SoServerGetClass_f			Object the class of a live object
@param	SoServerGetServer_f			Object the Server for a live object
@param	SoServerSetClientData_f		Set data in an object instance
@param	SoServerGetClientData_f		Get data from an object instance
@param	SoServerEval_f				Call the JavaScript interpreter
@param	SoServerTaggedDataInit_f	Initialize tagged data
@param  SoServerTaggedDataFree_f	Free tagged data
*/
#ifndef PUBLIC
/*
@param  SoServerCallLiveObject_f	Call a live object
@param  SoServerGetLiveObject_f		Get a live object property
@param  SoServerPutLiveObject_f		Set a live object property
*/
#endif

struct SoServerInterface_s
{
  SoServerDumpServer_f      dumpServer    ;
  SoServerDumpObject_f      dumpObject    ;
  SoServerAddClass_f        addClass      ;

  SoServerAddMethod_f       addMethod     ;
  SoServerAddMethods_f      addMethods    ;
  SoServerAddProperty_f     addProperty   ;
  SoServerAddProperties_f   addProperties ;

  SoServerGetClass_f        getClass       ;
  SoServerGetServer_f       getServer      ;

  SoServerSetClientData_f   setClientData  ;
  SoServerGetClientData_f   getClientData  ;

  SoServerEval_f            eval           ;
  SoServerTaggedDataInit_f  taggedDataInit ;
  SoServerTaggedDataFree_f	taggedDataFree ;

#ifndef PUBLIC
  SoServerCallLiveObject_f  callLiveObject ;
  SoServerGetLiveObject_f   getLiveObject  ;
  SoServerPutLiveObject_f   putLiveObject  ;
#else
  SoReserved_f   			reserved1  ;
  SoReserved_f   			reserved2  ;
  SoReserved_f   			reserved3  ;
#endif
} ;

/* ----------------------------------------------------------- */
/* CClient interface                                           */
/* ----------------------------------------------------------- */
typedef enum
{ kSoCClient_init
, kSoCClient_term
} SoCClient_e ;


/**
Your client function will be called to start and terminate your library
@param	eReason		init or terminate
@param	pServer		the server callback interface (to enable you to talk to ExtendScript)
@param	hServer		the server
*/
typedef ESerror_t (*SoCClient_f)
( SoCClient_e        eReason
, SoServerInterface* pServer
, SoHServer          hServer
) ;

/* ----------------------------------------------------------- */
/* library entry points                                        */
/* ----------------------------------------------------------- */
/**
SoCClientInitialize is used to initialize your library
@param	SoCClient_f				your client interface (objectInit, objectGet etc)
@param	SoMemoryInterface_f		your memory interface (malloc/free)
*/
extern ESerror_t SoCClientInitialize(SoCClient_f,SoMemoryInterface_p) ;

/**
SoCClientInitialize is used to terminate your library
@param	SoCClient_f				your client interface (objectInit, objectGet etc)
*/
extern ESerror_t SoCClientTerminate (SoCClient_f) ;

/**
SoCClientTerminateAll is used to close all client libraries
<p>You MUST call this to terminate all ExternalObjects which created classes, before exiting the ExtendScript environment</p>
*/
extern ESerror_t SoCClientTerminateAll() ;




#ifdef __cplusplus
}
#endif
#endif
