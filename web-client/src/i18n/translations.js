export const translations = {
  uk: {
    appName: "SkinCare Analysis",
    appSubtitle: "веб-застосунок аналізу та догляду за шкірою",

    login: "Вхід",
    register: "Реєстрація",
    logout: "Вийти",

    email: "Email",
    password: "Пароль",
    name: "Ім'я",

    signIn: "Увійти",
    signUp: "Створити акаунт",
    demoLogin: "Демо-вхід",

    user: "Користувач",
    admin: "Косметолог / адміністратор",

    dashboard: "Панель",
    profile: "Профіль",
    records: "Аналізи шкіри",
    environment: "IoT-показники",
    recommendations: "Рекомендації",
    users: "Користувачі",
    dataTools: "Дані",
    language: "Мова",
    role: "Роль",

    updated: "Оновлено",
    temperature: "Температура",
    humidity: "Вологість",

    skinCondition: "Стан шкіри",
    date: "Дата",
    analysisId: "ID аналізу",
    actions: "Дії",
    create: "Створити",
    delete: "Видалити",
    save: "Зберегти",
    clear: "Очистити",

    exportJson: "Експорт JSON",
    exportCsv: "Експорт CSV",
    importJson: "Імпорт JSON",
    backup: "Створити backup",

    search: "Пошук",
    sortBy: "Сортування",

    totalUsers: "Користувачів",
    totalRecords: "Записів",
    avgTemp: "Середня температура",
    avgHumidity: "Середня вологість",

    online: "Працює",
    apiMode: "Режим системи",
    apiReal: "активний",

    introUser:
      "Переглядайте результати аналізу, IoT-показники та рекомендації догляду.",
    introAdmin:
      "Керуйте користувачами, записами аналізу, імпортом, експортом та резервним копіюванням.",

    systemPatients: "Пацієнти системи",
    analysisRecords: "Записи аналізу",

    mySkinState: "Мій стан шкіри",
    skinId: "ID шкіри",
    skinType: "Тип шкіри",
    skinDescription: "Опис шкіри",
    notDefined: "Не визначено",
    noSkinDescription:
      "Опис стану шкіри ще не додано. Його може заповнити адміністратор у картці користувача.",

    personalCareTitle: "Персональний догляд",
    personalCareText:
      "У цьому розділі користувач може переглядати рекомендації, які допомагають підібрати щоденний догляд відповідно до стану шкіри.",

    environmentControlTitle: "Контроль середовища",
    environmentControlText:
      "IoT-показники температури та вологості допомагають оцінити умови, які можуть впливати на сухість, подразнення або жирність шкіри.",

    skinHistoryTitle: "Історія стану шкіри",
    skinHistoryText:
      "Користувач може переглядати результати аналізів і відстежувати зміни стану шкіри після процедур або курсу догляду.",

    patientManagementTitle: "Керування пацієнтами",
    patientManagementText:
      "Косметолог може переглядати список пацієнтів, контролювати їхні профілі та працювати з даними користувачів системи.",

    analysisControlTitle: "Контроль аналізів",
    analysisControlText:
      "Адміністратор має доступ до записів аналізу шкіри, може створювати нові записи та переглядати результати пацієнтів.",

    iotMonitoringTitle: "IoT-моніторинг",
    iotMonitoringText:
      "Система відображає показники середовища для пацієнтів, що дозволяє враховувати температуру та вологість при догляді за шкірою.",

    careTitle: "Персональні рекомендації догляду",
    morning: "Ранковий догляд",
    evening: "Вечірній догляд",
    weekly: "Щотижневий контроль",

    backupCreated: "Резервну копію створено локально",
    imported: "Дані імпортовано",

    apiNote:
      "Якщо сервер Render тимчасово недоступний, інтерфейс автоматично використовує демонстраційні дані.",
    noData: "Даних поки немає",

    // Records page
    skinAnalysis: "Аналізи шкіри",
    newAnalysis: "Новий аналіз шкіри",
    newAnalysisEyebrow: "Новий аналіз",
    newAnalysisDescription:
      "Оберіть тип аналізу, введіть результат та вкажіть ID шкіри клієнта. ID шкіри можна подивитися у розділі “Користувачі”.",
    analysisType: "Тип аналізу",
    analysisResult: "Результат аналізу",
    result: "Результат",
    clientSkinId: "ID шкіри клієнта",
    clientSkinIdPlaceholder: "Наприклад: 1",
    analysisResultPlaceholder:
      "Опишіть результат аналізу, виявлені особливості стану шкіри та коротку рекомендацію...",
    quickResultTemplates: "Швидкі шаблони результату:",
    createAnalysis: "Створити аналіз",
    chooseAnalysisType: "Оберіть або введіть тип аналізу",
    enterAnalysisResult: "Введіть результат аналізу",
    enterCorrectSkinId: "Введіть коректний ID шкіри клієнта",
    analysisCreated: "Аналіз успішно створено",
    confirmDeleteAnalysis: "Ви точно хочете видалити цей аналіз?",
    cannotCreateAnalysis: "Не вдалося створити аналіз",
    cannotDeleteAnalysis: "Не вдалося видалити аналіз",

    analysisTypeBlood: "Загальний аналіз крові",
    analysisTypeGlucose: "Аналіз рівня глюкози",
    analysisTypeScraping: "Зішкріб шкіри",
    analysisTypeAllergy: "Алергологічні проби",
    analysisTypeVitamins: "Аналіз на вітаміни та мікроелементи",
    analysisTypePhoto: "Photo analysis",
    analysisTypeSkinReview: "Огляд стану шкіри",

    templateNoPathology:
      "Патологічних змін не виявлено. Рекомендовано продовжити базовий догляд.",
    templateDryness:
      "Виявлено ознаки сухості та подразнення шкіри. Рекомендовано зволожувальний догляд.",
    templateOiliness:
      "Спостерігається підвищена жирність у T-зоні. Рекомендовано очищення та контроль себуму.",
    templateReaction:
      "Виявлено реакцію на косметичні компоненти. Рекомендовано тимчасово виключити подразники.",

    // Users page
    adminPanel: "Адмін",
    userId: "ID користувача",
    patientSkinCards: "Картки шкіри пацієнтів",
    patientSkinCardsText:
      "Тут адміністратор може переглянути ID шкіри кожного користувача, змінити тип шкіри та додати короткий опис стану. Саме ID шкіри використовується при створенні нового аналізу.",
    enterSkinType: "Введіть тип шкіри",
    shortSkinDescription: "Короткий опис стану шкіри",
    skinDataUpdated: "Дані шкіри оновлено",
    skinNotFoundForUser: "Для цього користувача не знайдено ID шкіри",
    cannotUpdateSkin: "Не вдалося оновити дані шкіри",

    skinTypeNormal: "Normal",
    skinTypeDry: "Суха шкіра",
    skinTypeOily: "Жирна шкіра",
    skinTypeCombination: "Комбінована шкіра",
    skinTypeSensitive: "Чутлива шкіра",
    skinTypeDehydrated: "Зневоднена шкіра",
    skinTypeIrritated: "Подразнена шкіра",
    skinTypeProblem: "Проблемна шкіра з висипаннями",

    // Recommendations page
    morningCareTitle: "Очищення та SPF",
    morningCareText:
      "М'який гель для вмивання, зволожувальний крем і SPF 30+.",
    eveningCareTitle: "Відновлення бар'єру",
    eveningCareText:
      "Сироватка з ніацинамідом та крем для відновлення шкірного бар'єру.",
    weeklyCareTitle: "Контроль стану",
    weeklyCareText:
      "Раз на тиждень фіксувати зміни шкіри та порівнювати з IoT-показниками.",
  },

  en: {
    appName: "SkinCare Analysis",
    appSubtitle: "skin analysis and care web application",

    login: "Login",
    register: "Register",
    logout: "Logout",

    email: "Email",
    password: "Password",
    name: "Name",

    signIn: "Sign in",
    signUp: "Create account",
    demoLogin: "Demo login",

    user: "User",
    admin: "Cosmetologist / admin",

    dashboard: "Dashboard",
    profile: "Profile",
    records: "Skin analyses",
    environment: "IoT data",
    recommendations: "Recommendations",
    users: "Users",
    dataTools: "Data",
    language: "Language",
    role: "Role",

    updated: "Updated",
    temperature: "Temperature",
    humidity: "Humidity",

    skinCondition: "Skin condition",
    date: "Date",
    analysisId: "Analysis ID",
    actions: "Actions",
    create: "Create",
    delete: "Delete",
    save: "Save",
    clear: "Clear",

    exportJson: "Export JSON",
    exportCsv: "Export CSV",
    importJson: "Import JSON",
    backup: "Create backup",

    search: "Search",
    sortBy: "Sort by",

    totalUsers: "Users",
    totalRecords: "Records",
    avgTemp: "Average temperature",
    avgHumidity: "Average humidity",

    online: "Online",
    apiMode: "System mode",
    apiReal: "active",

    introUser:
      "View skin analysis results, IoT measurements and care recommendations.",
    introAdmin:
      "Manage users, skin analyses, import, export and backup operations.",

    systemPatients: "System patients",
    analysisRecords: "Analysis records",

    mySkinState: "My skin condition",
    skinId: "Skin ID",
    skinType: "Skin type",
    skinDescription: "Skin description",
    notDefined: "Not defined",
    noSkinDescription:
      "Skin condition description has not been added yet. The administrator can fill it in the user card.",

    personalCareTitle: "Personal care",
    personalCareText:
      "In this section, the user can review recommendations that help select daily care according to the skin condition.",

    environmentControlTitle: "Environment control",
    environmentControlText:
      "IoT temperature and humidity measurements help evaluate conditions that may affect dryness, irritation or oiliness of the skin.",

    skinHistoryTitle: "Skin condition history",
    skinHistoryText:
      "The user can review analysis results and track skin condition changes after procedures or a care course.",

    patientManagementTitle: "Patient management",
    patientManagementText:
      "The cosmetologist can view the patient list, monitor profiles and work with user data in the system.",

    analysisControlTitle: "Analysis control",
    analysisControlText:
      "The administrator has access to skin analysis records, can create new records and review patient results.",

    iotMonitoringTitle: "IoT monitoring",
    iotMonitoringText:
      "The system displays environment measurements for patients, allowing temperature and humidity to be considered in skin care.",

    careTitle: "Personal care recommendations",
    morning: "Morning care",
    evening: "Evening care",
    weekly: "Weekly control",

    backupCreated: "Local backup created",
    imported: "Data imported",

    apiNote:
      "If the Render server is temporarily unavailable, the interface automatically uses demo data.",
    noData: "No data yet",

    // Records page
    skinAnalysis: "Skin analyses",
    newAnalysis: "New skin analysis",
    newAnalysisEyebrow: "New analysis",
    newAnalysisDescription:
      "Choose an analysis type, enter the result and specify the client's Skin ID. The Skin ID can be found in the “Users” section.",
    analysisType: "Analysis type",
    analysisResult: "Analysis result",
    result: "Result",
    clientSkinId: "Client Skin ID",
    clientSkinIdPlaceholder: "For example: 1",
    analysisResultPlaceholder:
      "Describe the analysis result, detected skin condition details and a short recommendation...",
    quickResultTemplates: "Quick result templates:",
    createAnalysis: "Create analysis",
    chooseAnalysisType: "Choose or enter an analysis type",
    enterAnalysisResult: "Enter the analysis result",
    enterCorrectSkinId: "Enter a valid client Skin ID",
    analysisCreated: "Analysis successfully created",
    confirmDeleteAnalysis: "Are you sure you want to delete this analysis?",
    cannotCreateAnalysis: "Could not create analysis",
    cannotDeleteAnalysis: "Could not delete analysis",

    analysisTypeBlood: "Complete blood count",
    analysisTypeGlucose: "Glucose level test",
    analysisTypeScraping: "Skin scraping test",
    analysisTypeAllergy: "Allergy tests",
    analysisTypeVitamins: "Vitamin and micronutrient test",
    analysisTypePhoto: "Photo analysis",
    analysisTypeSkinReview: "Skin condition review",

    templateNoPathology:
      "No pathological changes detected. Basic care is recommended.",
    templateDryness:
      "Signs of dryness and irritation detected. Moisturizing care is recommended.",
    templateOiliness:
      "Increased oiliness in the T-zone is observed. Cleansing and sebum control are recommended.",
    templateReaction:
      "A reaction to cosmetic components was detected. It is recommended to temporarily avoid irritants.",

    // Users page
    adminPanel: "Admin",
    userId: "User ID",
    patientSkinCards: "Patient skin cards",
    patientSkinCardsText:
      "Here the administrator can view each user's Skin ID, change the skin type and add a short condition description. The Skin ID is used when creating a new analysis.",
    enterSkinType: "Enter skin type",
    shortSkinDescription: "Short skin condition description",
    skinDataUpdated: "Skin data updated",
    skinNotFoundForUser: "No Skin ID was found for this user",
    cannotUpdateSkin: "Could not update skin data",

    skinTypeNormal: "Normal",
    skinTypeDry: "Dry skin",
    skinTypeOily: "Oily skin",
    skinTypeCombination: "Combination skin",
    skinTypeSensitive: "Sensitive skin",
    skinTypeDehydrated: "Dehydrated skin",
    skinTypeIrritated: "Irritated skin",
    skinTypeProblem: "Problem skin with breakouts",

    // Recommendations page
    morningCareTitle: "Cleansing and SPF",
    morningCareText:
      "Gentle cleansing gel, moisturizing cream and SPF 30+.",
    eveningCareTitle: "Barrier recovery",
    eveningCareText:
      "Niacinamide serum and cream for restoring the skin barrier.",
    weeklyCareTitle: "Condition tracking",
    weeklyCareText:
      "Record skin changes once a week and compare them with IoT measurements.",
  },
};