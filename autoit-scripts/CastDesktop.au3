Opt("WinTitleMatchMode", 2) ;~ Match any substring in the window title
Opt("SendKeyDelay", 100) ;~ Match any substring in the window title

Global $chromeTitle = "Google Chrome"

Global $previouslyOpenedWindow = WinGetHandle('[ACTIVE]')

If (Not WinExists($chromeTitle)) Then
  ShellExecute("chrome.exe", "--start-maximized")
  Sleep(500)
EndIf

WinActivate($chromeTitle)
WinSetState($chromeTitle, "", @SW_MAXIMIZE)
WinActivate($chromeTitle)
WinWaitActive($chromeTitle)

;~ Open file menu
Send('!f')

;~ Select cast
Send('c')

Sleep(1050)


;~ Select desktop
Send('{TAB}{TAB}{TAB}{ENTER}{DOWN}{DOWN}{ENTER}')

;~ Start stream request
Send('+{TAB}{ENTER}')

Sleep(150)

;~ Select first screen
Send('{TAB}{ENTER}')

WinActivate($previouslyOpenedWindow)