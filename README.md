# Umra Tours Website

Веб-сайт для туристической компании, специализирующейся на организации паломнических туров в Мекку и Медину.

## Технологии

- React
- TypeScript
- Material-UI
- Firebase (Authentication, Firestore, Storage)
- React Router
- i18next (для многоязычности)

## Установка

1. Клонируйте репозиторий:

```bash
git clone https://github.com/your-username/umra-tours.git
cd umra-tours
```

2. Установите зависимости:

```bash
npm install
```

3. Создайте файл `.env` в корневой директории и добавьте конфигурацию Firebase:

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. Запустите проект в режиме разработки:

```bash
npm run dev
```

## Структура проекта

```
src/
  ├── components/     # Переиспользуемые компоненты
  ├── pages/         # Страницы приложения
  ├── firebase/      # Конфигурация Firebase
  ├── hooks/         # Пользовательские хуки
  ├── types/         # TypeScript типы
  ├── assets/        # Статические ресурсы
  └── locales/       # Файлы локализации
```

## Функциональность

- Главная страница с информацией о компании и призывом к действию
- Страница "О нас" с информацией об организации и отзывами
- Каталог туров с фильтрацией
- Галерея фотографий
- Контактная форма
- Админ-панель для управления контентом

## Разработка

1. Создайте новую ветку для ваших изменений:

```bash
git checkout -b feature/your-feature-name
```

2. Внесите изменения и закоммитьте их:

```bash
git add .
git commit -m "Описание ваших изменений"
```

3. Отправьте изменения в репозиторий:

```bash
git push origin feature/your-feature-name
```

## Сборка для продакшена

```bash
npm run build
```

## Лицензия

MIT
