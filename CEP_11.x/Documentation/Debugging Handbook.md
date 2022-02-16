## 1. Mac

### 1.1 Checking & Editing Logging Settings

 - Set Log Level to 6 → defaults write com.adobe.CSXS.11 LogLevel 6
 - Check Log Level → defaults read com.adobe.CSXS.11 LogLevel

### 1.2. Extensions Folders

 - System Extension Folder → /Library/Application
   Support/Adobe/CEP/extensions
 - User Extension Folder → ~/Library/Application   
   Support/Adobe/CEP/extensions
 - Product Extension Folders → ${PP}/CEP/extensions

### 1.3. Logs Folders

 - CEP Logs Folder → ~/Library/Logs/CSXS
 - CEP Logs → CEP<Version Number>-<Product ID>.log e.g CEP11-ILST.log
 - CEPHTMLEngine Broser Logs → CEPHTMLEngine-`<versionNumber>`-`<HostID>`-`<HostVersion>`-`<ExtensionID>`.log (e.g
   CEPHtmlEngine11-ILST-26.0.3-com.adobe.illustrator.OnBoarding.
 - CEPHTMLEngine Renderer Logs → CEPHTMLEngine-`<versionNumber>`-`<HostID>`-`<HostVersion>`-`<ExtensionID>`-renderer.log
   (e.g CEPHtmlEngine11-ILST-26.0.3-com. 
   
### 1.4. Crash Dump
 - Get it in the Console App

## 2. Windows

### 2.1. Checking & Editing Logging Settings

 - Set Log Level to 6 → regedit >
   HKEY_CURRENT_USER/Software/Adobe/CSXS.11 > Set LogLevel as 6
 - Check Log Level → regedit > HKEY_CURRENT_USER/Software/Adobe/CSXS.11

### 2.2. Extensions Folders

 - System Extension Folder → C:\Program Files (x86)\Common
   Files\Adobe\CEP\extensions

- User Extension Folder → %AppData%\Roaming\Adobe\CEP\extensions

- Product Extension Folders → ${PP}\CEP\extensions

### 2.3. Logs Folders

- CEP Logs Folder → %temp%

- CEP Logs → CEP<Version Number>-<Product ID>.log e.g CEP11-ILST.log

- CEPHTMLEngine Broser Logs → CEPHTMLEngine-`<versionNumber>`-`<HostID>`-`<HostVersion>`-`<ExtensionID>`.log (e.g CEPHtmlEngine11-ILST-26.0.3-com.adobe.illustrator.OnBoarding.log)

- CEPHTMLEngine Renderer Logs → CEPHTMLEngineCEPHTMLEngine-`<versionNumber>`-`<HostID>`-`<HostVersion>`-`<ExtensionID>`-renderer.log (e.g CEPHtmlEngine11-ILST-26.0.3-com.adobe.illustrator.OnBoarding-renderer.log)

  

### 2.4 Crash Dump

 - %AppData%\Roaming\Adobe\CRLogs\dumps

## 3. Debugging Tools

- Add .[.debug](./.debug) file inside the extension folder which should be here 
- - Mac → /Library/Application
   Support/Adobe/CEP/extensions
   - Windows →  C:\Program Files (x86)\Common
   Files\Adobe\CEP\extensions
   
<Code> 

    <?xml version="1.0" encoding="UTF-8"?> 
    <ExtensionList>
        <Extension Id="com.adobe.cep.exchange.extension.panel">
            <HostList>
            	<Host Name="DRWV" Port="8701"/>
                <Host Name="FLPR" Port="8702"/>
                <Host Name="IDSN" Port="8703"/>
                <Host Name="AICY" Port="8704"/>
                <Host Name="ILST" Port="8705"/>
                <Host Name="PHSP" Port="8706"/>
                <Host Name="PHXS" Port="8707"/>
                <Host Name="PPRO" Port="8708"/>
                <Host Name="PRLD" Port="8709"/>
                <Host Name="AEFT" Port="8710"/>
                <Host Name="DEMO" Port="8711"/>
            </HostList>
        </Extension>
    </ExtensionList>


