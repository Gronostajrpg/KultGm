# KULT GM Companion — moduł Foundry 1.2

## Nowe w wersji 1.2

- Lokacje: przeciągaj karty w schemacie. Przeciągnij okrągły uchwyt na drugą kartę, aby utworzyć dwukierunkowe połączenie. Możesz też kliknąć dwa uchwyty kolejno. Kliknięcie linii usuwa połączenie; „Cofnij ostatnią zmianę” przywraca poprzedni układ. Dwuklik na karcie otwiera edycję. Zapis jest automatyczny.
- Sceny mają własną zakładkę. Dodaj nazwę, lokację, opis dla graczy i notatki MG. Do jednej lokacji można przypisać wiele scen. Wybierz scenę Foundry na karcie — powiązanie zapisuje się od razu, osobno dla świata.
- Dashboard pokazuje sceny dla aktualnej lokacji. „Pokaż graczom” od razu aktywuje przypisaną scenę Foundry. Nie wymaga ponownego wybierania sceny ani zapisywania powiązania.
- Dotychczasowe powiązania lokacji ze scenami zostaną przeniesione do zakładki Sceny. Zachowane są PC, notatki, wydarzenia i stan sesji; numer formatu kopii JSON pozostaje 1.
- Pozostałe narzędzia Foundry na dashboardzie są schowane pod rozwijaną sekcją. Dziennik również zapisuje powiązanie po wyborze.

Aktualizacja: wykonaj kopię sesji, zamknij świat, zastąp folder modułu folderem z nowej paczki, uruchom świat ponownie i odśwież przeglądarkę. Używaj tego samego adresu Foundry, świata, konta MG i przeglądarki, aby zachować lokalny zapis.

## Instalacja

1. Rozpakuj ZIP. Skopiuj cały folder `kult-gm-companion` do folderu danych Foundry: `Data/modules/`.
2. Sprawdź strukturę: `Data/modules/kult-gm-companion/module.json`. Unikaj dodatkowego poziomu folderu o tej samej nazwie.
3. Uruchom ponownie Foundry, otwórz świat i zaloguj się jako MG.
4. W „Manage Modules / Zarządzaj modułami” włącz „KULT GM Companion”. Odśwież sesję.
5. Na dole ekranu kliknij „KULT Companion”. Jeśli przycisk zasłania inny moduł, możesz też użyć makra typu Script:

```js
game.modules.get('kult-gm-companion').api.open();
```

Na hostingu bez dostępu do katalogu modułów administrator hostingu musi przesłać folder. Paczka nie ma internetowego adresu manifestu do instalowania przez „Install Module”.

## Przeniesienie sesji

W dotychczasowym lokalnym HTML kliknij „Kopia sesji”. Następnie w panelu Companion otwartym przez Foundry kliknij „Import” i wybierz kopię JSON. Import zastępuje dane po potwierdzeniu. Oryginalny zapis lokalnego HTML pozostaje w jego przeglądarce.

Stan panelu modułu zapisuje się lokalnie w przeglądarce, osobno dla świata i konta MG. Nie trafia do bazy świata Foundry. Przy zmianie przeglądarki, komputera lub adresu serwera przenieś kopię JSON. Regularnie eksportuj kopie.

## Podczas sesji

- W zakładce Sceny dodaj własną scenę i przypisz jej lokację oraz scenę Foundry. Wybór sceny zapisuje powiązanie automatycznie.
- „Pokaż graczom” na karcie sceny aktywuje ją przez Foundry i ustawia jej lokację w Companion. Sama zmiana lokacji w Companion nie przełącza stołu.
- „Wyślij opis lokacji na czat” otwiera podgląd wyłącznie opisu dla graczy. Wysyłka następuje po kliknięciu przycisku w podglądzie.
- „Utwórz handout z opisu” tworzy nowy wpis dziennika z opisem dla graczy, nadaje graczom możliwość odczytu i pokazuje wpis połączonym graczom. Każde wysłanie tworzy nowy handout.
- „Wyślij wskazówkę do Foundry” wysyła jej opis na publiczny czat. Dopiero potwierdzenie z Foundry oznacza wskazówkę jako ujawnioną.
- „Podgląd dziennika MG” otwiera wybrany wpis w Foundry i chowa Companion. „Pokaż powiązany dziennik” pokazuje cały istniejący wpis wszystkim połączonym graczom, nawet bez wcześniejszych uprawnień; najpierw sprawdź treść w podglądzie.
- „Wróć do stołu” chowa panel bez zamykania połączenia. Przycisk „KULT Companion” przywraca panel. „Zamknij panel” zamyka połączenie; zapis pozostaje.
- „Odśwież listę” pobiera aktualne sceny i dzienniki. Usunięte dokumenty nie są odtwarzane automatycznie.

## Zakres i sprawdzenie

Moduł używa API dokumentów Foundry. Nie wymaga socketlib, zewnętrznego serwera, tokenów ani haseł. Komendy są dostępne tylko w ramce otwartej przez moduł w zalogowanej sesji MG. Nie synchronizuje kart PC, zasobów ani mechaniki KULT.

Przygotowany dla Foundry 12–14 na podstawie publicznego API. Logikę integracji sprawdzono testami z zastępczym API; bez dostępu do uruchomionego świata użytkownika nie przeprowadzono testu w rzeczywistej sesji Foundry. Manifest nie deklaruje wersji jako „verified”.

Pierwszy test w swoim świecie: powiąż scenę testową, aktywuj ją, wyślij krótki opis i otwórz nowy handout z konta gracza. Nie używaj wpisu zawierającego sekrety MG do testowania pokazywania istniejących dzienników.

Jeżeli widzisz „Tryb lokalny”, otworzyłeś plik Companion bez modułu albo bez zalogowanego MG. Jeżeli po wysłaniu wystąpi brak potwierdzenia, sprawdź czat lub dzienniki przed ponowieniem — czynność mogła zostać wykonana.

Oficjalne źródła API: https://foundryvtt.com/article/module-development/ · https://foundryvtt.com/api/v13/classes/foundry.documents.Scene.html · https://foundryvtt.com/api/v13/classes/foundry.documents.JournalEntry.html · https://foundryvtt.com/api/v13/classes/foundry.documents.ChatMessage.html
