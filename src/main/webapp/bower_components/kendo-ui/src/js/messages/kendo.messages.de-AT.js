/** 
 * Copyright 2017 Telerik AD                                                                                                                                                                            
 *                                                                                                                                                                                                      
 * Licensed under the Apache License, Version 2.0 (the "License");                                                                                                                                      
 * you may not use this file except in compliance with the License.                                                                                                                                     
 * You may obtain a copy of the License at                                                                                                                                                              
 *                                                                                                                                                                                                      
 *     http://www.apache.org/licenses/LICENSE-2.0                                                                                                                                                       
 *                                                                                                                                                                                                      
 * Unless required by applicable law or agreed to in writing, software                                                                                                                                  
 * distributed under the License is distributed on an "AS IS" BASIS,                                                                                                                                    
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.                                                                                                                             
 * See the License for the specific language governing permissions and                                                                                                                                  
 * limitations under the License.                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       

*/

(function(f){
    if (typeof define === 'function' && define.amd) {
        define(["kendo.core"], f);
    } else {
        f();
    }
}(function(){
(function ($, undefined) {
  /* Filter cell operator messages */

  if (kendo.ui.FilterCell) {
    kendo.ui.FilterCell.prototype.options.operators =
      $.extend(true, kendo.ui.FilterCell.prototype.options.operators, {
        "date": {
          "eq": "gleich ist",
          "gt": "sp??ter ist als",
          "gte": "gleich oder sp??ter ist als",
          "lt": "fr??her ist als",
          "lte": "fr??her oder gleich ist als",
          "neq": "nicht gleich ist",
          "isnull": "Null ist",
          "isnotnull": "nicht Null ist"
        },
        "enums": {
          "eq": "gleich ist",
          "neq": "nicht gleich ist",
          "isnull": "Null ist",
          "isnotnull": "nicht Null ist"
        },
        "number": {
          "eq": "gleich ist",
          "gt": "gr????er ist als",
          "gte": "gr????er als oder gleich ist",
          "lt": "kleiner ist",
          "lte": "kleiner als oder gleich ist",
          "neq": "nicht gleich ist",
          "isnull": "Null ist",
          "isnotnull": "nicht Null ist"
        },
        "string": {
          "contains": "beinhaltet",
          "doesnotcontain": "nicht beinhaltet",
          "endswith": "endet mit",
          "eq": "gleich ist",
          "neq": "nicht gleich ist",
          "startswith": "beginnt mit",
          "isnull": "Null ist",
          "isnotnull": "nicht Null ist",
          "isempty": "leer ist",
          "isnotempty": "nicht leer ist"
        }
      });
  }

  /* Filter menu operator messages */

  if (kendo.ui.FilterMenu) {
    kendo.ui.FilterMenu.prototype.options.operators =
      $.extend(true, kendo.ui.FilterMenu.prototype.options.operators, {
        "date": {
          "eq": "gleich ist",
          "gt": "sp??ter ist als",
          "gte": "gleich oder sp??ter ist als",
          "lt": "fr??her ist als",
          "lte": "fr??her oder gleich ist",
          "neq": "nicht gleich ist",
          "isnull": "Null ist",
          "isnotnull": "nicht Null ist"
        },
        "enums": {
          "eq": "gleich ist",
          "neq": "nicht gleich ist",
          "isnull": "Null ist",
          "isnotnull": "nicht Null ist"
        },
        "number": {
          "eq": "gleich ist",
          "gt": "gr????er ist als",
          "gte": "gr????er als oder gleich ist",
          "lt": "kleiner ist als",
          "lte": "kleiner als oder gleich ist",
          "neq": "nicht gleich ist",
          "isnull": "Null ist",
          "isnotnull": "nicht Null ist"
        },
        "string": {
          "contains": "beinhaltet",
          "doesnotcontain": "nicht beinhaltet",
          "endswith": "endet mit",
          "eq": "gleich ist",
          "neq": "nicht gleich ist",
          "startswith": "beginnt mit",
          "isnull": "Null ist",
          "isnotnull": "nicht Null ist",
          "isempty": "leer ist",
          "isnotempty": "nicht leer ist"
        }
      });
  }

  /* FilterCell messages */

  if (kendo.ui.FilterCell) {
    kendo.ui.FilterCell.prototype.options.messages =
      $.extend(true, kendo.ui.FilterCell.prototype.options.messages, {
        "clear": "L??schen",
        "filter": "Filter",
        "isFalse": "ist falsch",
        "isTrue": "ist richtig",
        "operator": "Operator"
      });
  }

  /* FilterMenu messages */

  if (kendo.ui.FilterMenu) {
    kendo.ui.FilterMenu.prototype.options.messages =
      $.extend(true, kendo.ui.FilterMenu.prototype.options.messages, {
        "and": "und",
        "clear": "L??schen",
        "filter": "Filtern",
        "info": "Zeilen mit Wert anzeigen, der",
        "isFalse": "falsch",
        "isTrue": "richtig",
        "or": "oder",
        "selectValue": "-W??hlen Sie-",
        "cancel": "Abbrechen",
        "operator": "Operator",
        "value": "Wert"
      });
  }

  /* FilterMultiCheck messages */

  if (kendo.ui.FilterMultiCheck) {
    kendo.ui.FilterMultiCheck.prototype.options.messages =
      $.extend(true, kendo.ui.FilterMultiCheck.prototype.options.messages, {
        "checkAll": "Alle ausw??hlen",
        "clear": "L??schen",
        "filter": "Filtern",
        "search": "Suchen",
        "selectedItemsFormat": "{0} Element(e) ausgew??hlt"
      });
  }

  /* ColumnMenu messages */

  if (kendo.ui.ColumnMenu) {
    kendo.ui.ColumnMenu.prototype.options.messages =
      $.extend(true, kendo.ui.ColumnMenu.prototype.options.messages, {
        "columns": "Spalten",
        "sortAscending": "Aufsteigend sortieren",
        "sortDescending": "Absteigend sortieren",
        "settings": "Spalteneinstellungen",
        "done": "Erledigt",
        "lock": "Sperren",
        "unlock": "Entsperren",
        "filter": "Filtern"
      });
  }

  /* RecurrenceEditor messages */

  if (kendo.ui.RecurrenceEditor) {
    kendo.ui.RecurrenceEditor.prototype.options.messages =
      $.extend(true, kendo.ui.RecurrenceEditor.prototype.options.messages, {
        "daily": {
          "interval": "Tag(e)",
          "repeatEvery": "Wiederholen an jedem:"
        },
        "end": {
          "after": "Nach",
          "occurrence": "Anzahl Wiederholungen",
          "label": "Beenden:",
          "never": "Nie",
          "on": "Am",
          "mobileLabel": "Endet"
        },
        "frequencies": {
          "daily": "T??glich",
          "monthly": "Monatlich",
          "never": "Nie",
          "weekly": "W??chentlich",
          "yearly": "J??hrlich"
        },
        "monthly": {
          "day": "Tag",
          "interval": "Monat(e)",
          "repeatEvery": "Wiederholen an jedem:",
          "repeatOn": "Wiederholen am:"
        },
        "offsetPositions": {
          "first": "ersten",
          "fourth": "vierten",
          "last": "letzten",
          "second": "zweiten",
          "third": "dritten"
        },
        "weekly": {
          "repeatEvery": "Wiederholen an jedem:",
          "repeatOn": "Wiederholen am:",
          "interval": "Woche(n)"
        },
        "yearly": {
          "of": "von",
          "repeatEvery": "Wiederholen an jedem:",
          "repeatOn": "Wiederholen am:",
          "interval": "Jahr(e)"
        },
        "weekdays": {
          "day": "Tag",
          "weekday": "Wochentag",
          "weekend": "Tag am Wochenende"
        }
      });
  }

  /* Editor messages */

  if (kendo.ui.Editor) {
    kendo.ui.Editor.prototype.options.messages =
      $.extend(true, kendo.ui.Editor.prototype.options.messages, {
        "backColor": "Hintergrundfarbe",
        "bold": "Fett",
        "createLink": "Hyperlink einf??gen",
        "deleteFile": "Sind Sie sicher, dass Sie \"{0}\" l??schen wollen?",
        "dialogButtonSeparator": "oder",
        "dialogCancel": "Abbrechen",
        "dialogInsert": "Einf??gen",
        "directoryNotFound": "Kein Verzeichnis mit diesem Namen gefunden",
        "emptyFolder": "Leeres Verzeichnis",
        "fontName": "Schriftfamilie",
        "fontNameInherit": "(Schrift ??bernehmen)",
        "fontSize": "Gr????e",
        "fontSizeInherit": "(Gr????e ??bernehmen)",
        "foreColor": "Farbe",
        "formatBlock": "Absatzstil",
        "imageAltText": "Abwechselnder Text",
        "imageWebAddress": "Web-Adresse",
        "imageWidth": "Breite (px)",
        "imageHeight": "H??he (px)",
        "indent": "Einzug vergr????ern",
        "insertHtml": "HTML einf??gen",
        "insertImage": "Bild einf??gen",
        "insertOrderedList": "Numerierte Liste",
        "insertUnorderedList": "Aufz??hlliste",
        "invalidFileType": "Die ausgew??hlte Datei \"{0}\" ist ung??ltig. Unterst??tzte Dateitypen sind {1}.",
        "italic": "Kursiv",
        "justifyCenter": "Zentriert",
        "justifyFull": "Ausrichten",
        "justifyLeft": "Linksb??ndig",
        "justifyRight": "Rechtsb??ndig",
        "linkOpenInNewWindow": "Link in einem neuen Fenster ??ffnen",
        "linkText": "Text",
        "linkToolTip": "ToolTip",
        "linkWebAddress": "Web-Adresse",
        "orderBy": "Sortiert nach:",
        "orderByName": "Name",
        "orderBySize": "Gr????e",
        "outdent": "Einzug verkleinern",
        "overwriteFile": "Eine Datei mit dem Namen \"{0}\" existiert bereits im aktuellen Verzeichnis. Wollen Sie diese ??berschreiben?",
        "search": "Suchen",
        "strikethrough": "Durchgestrichen",
        "styles": "Stil",
        "subscript": "Tiefgestellt",
        "superscript": "Hochgestellt",
        "underline": "Unterstrichen",
        "unlink": "Hyperlink entfernen",
        "uploadFile": "Hochladen",
        "createTable": "Tabelle einf??gen",
        "addColumnLeft": "Spalte links einf??gen",
        "addColumnRight": "Spalte rechts einf??gen",
        "addRowAbove": "Zeile oberhalb einf??gen",
        "addRowBelow": "Zeile unterhalb einf??gen",
        "deleteColumn": "Spalte l??schen",
        "deleteRow": "Zeile l??schen",
        "dropFilesHere": "Dateien hierhin ziehen zum Hochladen",
        "formatting": "Format",
        "viewHtml": "View HTML",
        "dialogUpdate": "Aktualisieren",
        "insertFile": "Datei einf??gen",
        "dialogOk": "OK",
        "tableWizard": "Tabellen-Assistent",
        "tableTab": "Tabelle",
        "cellTab": "Tabellenzelle",
        "accessibilityTab": "Zug??nglichkeit",
        "caption": "Erkl??rung",
        "summary": "Zusammenfassung",
        "width": "Breite",
        "height": "H??he",
        "cellSpacing": "Zellabstand",
        "cellPadding": "Zellauff??llung",
        "cellMargin": "Zellenrand",
        "alignment": "Ausrichtung",
        "background": "Hintergrund",
        "cssClass": "CSS Klasse",
        "id": "Id",
        "border": "Rahmen",
        "borderStyle": "Rahmenstil",
        "collapseBorders": "Collapse rahmen",
        "wrapText": "Texth??lle",
        "associateCellsWithHeaders": "Zellen mit header verbinden",
        "alignLeft": "Ausrichten links",
        "alignCenter": "Ausrichten zentriert",
        "alignRight": "Ausrichten rechts",
        "alignLeftTop": "Ausrichten links und oben",
        "alignCenterTop": "Ausrichten zentriert und oben",
        "alignRightTop": "Ausrichten rechts und oben",
        "alignLeftMiddle": "Ausrichten links und mitte",
        "alignCenterMiddle": "Ausrichten zentriert und mitte",
        "alignRightMiddle": "Ausrichten rechts und mitte",
        "alignLeftBottom": "Ausrichten links und unten",
        "alignCenterBottom": "Ausrichten zentriert und unten",
        "alignRightBottom": "Ausrichten rechts und unten",
        "alignRemove": "Ausrichtung entfernen",
        "columns": "Spalten",
        "rows": "Reihen",
        "selectAllCells": "Alle Tabellenzellen ausw??hlen"
      });
  }

  /* FileBrowser and ImageBrowser messages */

  var browserMessages = {
    "uploadFile": "Hochladen",
    "orderBy": "Sortieren nach",
    "orderByName": "Name",
    "orderBySize": "Gr????e",
    "directoryNotFound": "Das Verzeichnis wurde nicht gefunden.",
    "emptyFolder": "Leeres Verzeichnis",
    "deleteFile": 'Sind Sie sicher, dass Sie "{0}" wirklich l??schen wollen?',
    "invalidFileType": "Die ausgew??hlte Datei \"{0}\" ist ung??ltig. Unterst??tzte Dateitypen sind {1}.",
    "overwriteFile": "Eine Datei namens \"{0}\" existiert bereits im aktuellen Ordner. ??berschreiben?",
    "dropFilesHere": "Dateien hierhin ziehen zum Hochladen",
    "search": "Suchen"
  };

  if (kendo.ui.FileBrowser) {
    kendo.ui.FileBrowser.prototype.options.messages =
      $.extend(true, kendo.ui.FileBrowser.prototype.options.messages, browserMessages);
  }

  if (kendo.ui.ImageBrowser) {
    kendo.ui.ImageBrowser.prototype.options.messages =
      $.extend(true, kendo.ui.ImageBrowser.prototype.options.messages, browserMessages);
  }

  /* Gantt messages */

  if (kendo.ui.Gantt) {
    kendo.ui.Gantt.prototype.options.messages =
      $.extend(true, kendo.ui.Gantt.prototype.options.messages, {
        "actions": {
          "addChild": "Unteraufgabe hinzuf??gen",
          "append": "Aufgabe hinzuf??gen",
          "insertAfter": "Unter einf??gen",
          "insertBefore": "??ber einf??gen",
          "pdf": "Exportieren als PDF"
        },
        "cancel": "Abbrechen",
        "deleteDependencyWindowTitle": "Beziehung l??schen",
        "deleteTaskWindowTitle": "Aufgabe l??schen",
        "destroy": "L??schen",
        "editor": {
          "assingButton": "Zuweisen",
          "editorTitle": "Aufgabe",
          "end": "Ende",
          "percentComplete": "abgeschlossen",
          "resources": "Ressourcen",
          "resourcesEditorTitle": "Ressourcen",
          "resourcesHeader": "Ressourcen",
          "start": "Start",
          "title": "Titel",
          "unitsHeader": "Einheiten"
        },
        "save": "Speichern",
        "views": {
          "day": "Tag",
          "end": "Ende",
          "month": "Monat",
          "start": "Start",
          "week": "Woche",
          "year": "Jahr"
        }
      });
  }

  /* Grid messages */

  if (kendo.ui.Grid) {
    kendo.ui.Grid.prototype.options.messages =
      $.extend(true, kendo.ui.Grid.prototype.options.messages, {
        "commands": {
          "canceledit": "Abbrechen",
          "cancel": "??nderungen verwerfen",
          "create": "Neuen Datensatz hinzuf??gen",
          "destroy": "L??schen",
          "edit": "Bearbeiten",
          "excel": "Exportieren als Excel",
          "pdf": "Exportieren als PDF",
          "save": "??nderungen speichern",
          "select": "W??hle",
          "update": "Aktualisieren"
        },
        "editable": {
          "confirmation": "Sind Sie sicher, dass Sie diesen Datensatz l??schen wollen?",
          "cancelDelete": "Abbrechen",
          "confirmDelete": "L??schen"
        },
        "noRecords": "Keine Datens??tze verf??gbar."
      });
  }

  /* TreeList messages */

  if (kendo.ui.TreeList) {
    kendo.ui.TreeList.prototype.options.messages =
      $.extend(true, kendo.ui.TreeList.prototype.options.messages, {
        "noRows": "Keine Datens??tze verf??gbar.",
        "loading": "Lade Daten...",
        "requestFailed": "Laden fehlgeschlagen",
        "retry": "Neu laden",
        "commands": {
          "edit": "Bearbeiten",
          "update": "Aktualisieren",
          "canceledit": "Abbrechen",
          "create": "Neuen Datensatz hinzuf??gen",
          "createchild": "Neuen untergeordneten Datensatz hinzuf??gen",
          "destroy": "L??schen",
          "excel": "Exportieren als Excel",
          "pdf": "Exportieren als PDF"
        }
      });
  }

  /* Groupable messages */

  if (kendo.ui.Groupable) {
    kendo.ui.Groupable.prototype.options.messages =
      $.extend(true, kendo.ui.Groupable.prototype.options.messages, {
        "empty": "Ziehen Sie eine Spalten??berschrift hierher, um nach dieser Spalte zu gruppieren"
      });
  }

  /* NumericTextBox messages */

  if (kendo.ui.NumericTextBox) {
    kendo.ui.NumericTextBox.prototype.options =
      $.extend(true, kendo.ui.NumericTextBox.prototype.options, {
        "upArrowText": "Wert erh??hen",
        "downArrowText": "Wert verringern"
      });
  }

  /* Pager messages */

  if (kendo.ui.Pager) {
    kendo.ui.Pager.prototype.options.messages =
      $.extend(true, kendo.ui.Pager.prototype.options.messages, {
        "allPages": "Alle",
        "display": "Eintr??ge {0} - {1} von {2}",
        "empty": "keine Daten",
        "first": "Zur ersten Seite",
        "itemsPerPage": "Elemente pro Seite",
        "last": "Zur letzten Seite",
        "next": "Zur n??chsten Seite",
        "of": "von {0}",
        "page": "Seite",
        "previous": "Zur vorherigen Seite",
        "refresh": "Aktualisieren",
        "morePages": "Weitere Seiten"
      });
  }

  /* Upload messages */

  if (kendo.ui.Upload) {
    kendo.ui.Upload.prototype.options.localization =
      $.extend(true, kendo.ui.Upload.prototype.options.localization, {
        "cancel": "Beenden",
        "dropFilesHere": "Dateien hierhin ziehen zum Hochladen",
        "remove": "L??schen",
        "retry": "Wiederholen",
        "select": "W??hlen Sie...",
        "statusFailed": "nicht erfolgreich",
        "statusWarning": "Warnung",
        "statusUploaded": "hochgeladen",
        "statusUploading": "hochladen",
        "uploadSelectedFiles": "Dateien hochladen",
        "headerStatusUploaded": "Hochgeladen",
        "headerStatusUploading": "Hochladen..."
      });
  }

  /* Scheduler messages */

  if (kendo.ui.Scheduler) {
    kendo.ui.Scheduler.prototype.options.messages =
      $.extend(true, kendo.ui.Scheduler.prototype.options.messages, {
        "allDay": "Ganzer Tag",
        "cancel": "Abbrechen",
        "date": "Datum",
        "destroy": "L??schen",
        "pdf": "Exportieren als PDF",
        "editable": {
          "confirmation": "M??chten Sie diesen Termin wirklich l??schen?"
        },
        "editor": {
          "allDayEvent": "Ganzt??giger Termin",
          "description": "Beschreibung",
          "editorTitle": "Termin",
          "end": "Beenden",
          "timezoneTitle": "Zeitzone",
          "endTimezone": "Zeitzone Ende",
          "repeat": "Wiederholen",
          "separateTimezones": "Unterschiedliche Start- und Endzeitzonen benutzen",
          "start": "Starten",
          "startTimezone": "Zeitzone Start",
          "timezone": "Zeitzonen bearbeiten",
          "timezoneEditorButton": "Zeitzone",
          "timezoneEditorTitle": "Zeitzonen",
          "title": "Titel",
          "noTimezone": "Keine Zeitzone"
        },
        "event": "Termin",
        "recurrenceMessages": {
          "deleteRecurring": "M??chten Sie nur diesen Termin oder alle Wiederholungen l??schen?",
          "deleteWindowOccurrence": "Diesen Termin l??schen",
          "deleteWindowSeries": "Alle Wiederholungen des Termins l??schen",
          "deleteWindowTitle": "Diesen Termin und alle Wiederholungen l??schen",
          "editRecurring": "M??chten Sie nur diesen Termin oder alle Wiederholungen bearbeiten?",
          "editWindowOccurrence": "Aktuelles Ereignis bearbeiten",
          "editWindowSeries": "Serie bearbeiten",
          "editWindowTitle": "Wiederholungseintrag bearbeiten"
        },
        "save": "Speichern",
        "time": "Zeit",
        "today": "Heute",
        "views": {
          "agenda": "Agenda",
          "day": "Tag",
          "month": "Monat",
          "week": "Woche",
          "workWeek": "Arbeitswoche",
          "timeline": "Zeitstrahl",
          "timelineWeek": "Zeitstrahl Woche",
          "timelineWorkWeek": "Zeitstrahl Arbeitswoche",
          "timelineMonth": "Zeitstrahl Monat"
        },
        "deleteWindowTitle": "Termin l??schen",
        "defaultRowText": "Alle Termine",
        "showFullDay": "Ganzen Tag anzeigen",
        "showWorkDay": "Gesch??ftszeiten anzeigen",
        "ariaSlotLabel": "Ausgew??hlt von {0:t} bis {1:t}",
        "ariaEventLabel": "{0} am {1:D} um {2:t}"
      });
  }

  /* Validator messages */

  if (kendo.ui.Validator) {
    kendo.ui.Validator.prototype.options.messages =
      $.extend(true, kendo.ui.Validator.prototype.options.messages, {
        "required": "{0} ist notwendig",
        "pattern": "{0} ist ung??ltig",
        "min": "{0} muss gr????er oder gleich sein als {1}",
        "max": "{0} muss kleiner oder gleich sein als {1}",
        "step": "{0} ist ung??ltig",
        "email": "{0} ist keine g??ltige E-Mail",
        "url": "{0} ist keine g??ltige URL",
        "date": "{0} ist kein g??ltiges Datum"
      });
  }

  /* Dialog */

  if (kendo.ui.Dialog) {
    kendo.ui.Dialog.prototype.options.messages =
      $.extend(true, kendo.ui.Dialog.prototype.options.localization, {
        "close": "Schlie??en"
      });
  }

  /* Alert */

  if (kendo.ui.Alert) {
    kendo.ui.Alert.prototype.options.messages =
      $.extend(true, kendo.ui.Alert.prototype.options.localization, {
        "okText": "OK"
      });
  }

  /* Confirm */

  if (kendo.ui.Confirm) {
    kendo.ui.Confirm.prototype.options.messages =
      $.extend(true, kendo.ui.Confirm.prototype.options.localization, {
        "okText": "OK",
        "cancel": "Abbrechen"
      });
  }

  /* Prompt */

  if (kendo.ui.Prompt) {
    kendo.ui.Prompt.prototype.options.messages =
      $.extend(true, kendo.ui.Prompt.prototype.options.localization, {
        "okText": "OK",
        "cancel": "Abbrechen"
      });
  }

})(window.kendo.jQuery);}));