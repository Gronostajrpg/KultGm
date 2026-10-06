# KULT GM Companion

Panel Mistrza Gry do KULT: Divinity Lost. Własne PC i sekrety, wydarzenia, NPC, wskazówki, zasoby i dziennik sesji. Edytor lokacji obsługuje przeciąganie, łączenie uchwytami oraz cofanie zmiany. Sceny mają osobne powiązania z Foundry, zapis automatyczny i aktywację jednym kliknięciem.

## Instalacja i aktualizacje w Foundry

W Foundry: Setup → Add-on Modules → Install Module → Manifest URL. Wklej:

https://github.com/Gronostajrpg/KultGm/releases/latest/download/module.json

W świecie włącz KULT GM Companion i kliknij KULT Companion na dole ekranu jako MG.

Późniejsze wersje pobierzesz przyciskiem aktualizacji modułu w Setup, bez kopiowania folderów i bez tokenu. Przed pierwszą instalacją przez manifest wykonaj kopię sesji. Jeśli masz moduł zainstalowany ręcznie, a Foundry odmawia ponownej instalacji, usuń starą instalację modułu i zainstaluj przez manifest; zachowaj kopię JSON.

## Wydawanie nowej wersji

1. Zmień kod i zwiększ `version` w `module.json`, np. z `1.2.0` na `1.2.1`.
2. Zapisz zmianę na GitHubie.
3. Otwórz **Actions → Wydaj moduł Foundry → Run workflow** na gałęzi z tym kodem.

Workflow sprawdzi składnię, zbuduje paczkę i opublikuje GitHub Release z plikami `module.json` oraz `module.zip`. Adresy zostaną wygenerowane dla rzeczywistego konta i nazwy repozytorium. Nie potrzebujesz dodatkowego tokenu ani płatnego hostingu.

Alternatywnie możesz wysłać tag zgodny z wersją, np. `v1.2.1`; uruchomi ten sam workflow. Istniejące wydania nie są nadpisywane. Nie wydawaj starszej wersji jako nowej „latest”.

Repozytorium i wydania są publiczne. Foundry pobiera aktualizacje bez logowania do GitHuba.

## Zapis i zakres

Stan kampanii pozostaje w lokalnej pamięci przeglądarki, osobno dla świata i konta MG. GitHub i wydania zawierają kod i dane początkowe; nie zawierają bieżących notatek ani sesji. Kopie JSON wykonuj regularnie. Aktualizacja plików modułu nie zastępuje lokalnego stanu.

Moduł przygotowano dla Foundry 12–14 na podstawie API; zgodność w rzeczywistym świecie wymaga sprawdzenia. Nie deklaruje wersji „verified”. Szczegóły obsługi i ręcznej instalacji: [INSTALACJA.md](INSTALACJA.md).

## Materiały scenariusza

Początkowy zestaw danych jest oparty na „The Island of the Dead” autorstwa Robina Liljenberga. Karty podają strony PDF; własne adaptacje pozostają materiałem MG. PDF, grafiki i pełny tekst scenariusza nie są częścią tej paczki. Moduł jest nieoficjalny i nie jest powiązany z wydawcami KULT ani Foundry.

