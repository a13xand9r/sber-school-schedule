export const buttons = {
  general: [
    'Расписание на среду',
    'Какие уроки в пятницу',
    'Добавь задание по физике',
    'Запиши домашнее задание по алгебре',
    'Новое задание по химии на четверг',
    'Добавь задание по биологии на завтра'
  ],
  generalSberBox: [
    'Расписание на среду',
    'Расписание на четверг',
    'Какие уроки во вторник',
    'Какие уроки в пятницу',
  ],
  schedulePage: [
    'Какие уроки в понедельник?',
    'Какие уроки во вторник?',
    'Расписание в среду',
    'Расписание на четверг',
    'Какие уроки в пятницу?',
    'Расписание на субботу',
    'Добавь задание по физике',
    'Покажи домашку',
    'Редактировать расписание',
  ],
  schedulePageEditMode: [
    'Добавь предмет',
    'Добавь физику',
    'Добавь математику',
    'Удали биологию',
    'Убери русский язык',
    'Сохранить',
  ],
}

export const allSubjects = [
  { subject: 'Алгебра', subSubject: 'Алгебре', icon: '/algebra.png' as string },
  { subject: 'Астрономия', subSubject: 'Астрономии', icon: '/astron.png' as string },
  { subject: 'Русский язык', subSubject: 'Русскому языку', icon: '/russia.png' as string },
  { subject: 'Белорусский язык', subSubject: 'Белорусскому языку', icon: '/by.png' as string },
  { subject: 'Украинский язык', subSubject: 'Украинскому языку', icon: '/ukr.png' as string },
  { subject: 'Казахский язык', subSubject: 'Казахскому языку', icon: '/kazakhstan.png' as string },
  { subject: 'Английский язык', subSubject: 'Английскому языку', icon: '/english.png' as string },
  { subject: 'Немецкий язык', subSubject: 'Немецкому языку', icon: '/germany.png' as string },
  { subject: 'Французский язык', subSubject: 'Французскому языку', icon: '/franc.png' as string },
  { subject: 'Родной язык', subSubject: 'Родному языку', icon: '/books.png' as string },
  { subject: 'Биология', subSubject: 'Биологии', icon: '/biology.png' as string },
  { subject: 'Всемирная история', subSubject: 'Всемирной истории', icon: '/history.png' as string },
  { subject: 'География', subSubject: 'Географии', icon: '/earth.png' as string },
  { subject: 'Геометрия', subSubject: 'Геометрии', icon: '/geometry.png' as string },
  { subject: 'Естествознание', subSubject: 'Естествознанию', icon: '/tree.png' as string },
  { subject: 'Зарубежная литература', subSubject: 'Зарубежной литературе', icon: '/books.png' as string },
  { subject: 'Зарубежный язык', subSubject: 'Зарубежному языку', icon: '/books.png' as string },
  { subject: 'Информатика', subSubject: 'Информатике', icon: '/it.png' as string },
  { subject: 'Искусство', subSubject: 'Искусству', icon: '/art.png' as string },
  { subject: 'История', subSubject: 'Истории', icon: '/history.png' as string },
  { subject: 'Классный час', subSubject: 'Классному часу', icon: '/time.png' as string },
  { subject: 'Математика', subSubject: 'Математике', icon: '/algebra.png' as string },
  { subject: 'Мировая художественная культура', subSubject: 'Мировой художественной культуре', icon: '/books.png' as string },
  { subject: 'Музыка (пение)', subSubject: 'Музыке (пению)', icon: '/music.png' as string },
  { subject: 'Начальная военная подготовка', subSubject: 'Начальной военной подготовке', icon: '/army.png' as string },
  { subject: 'Обществознание', subSubject: 'Обществознанию', icon: '/society.png' as string },
  { subject: 'Основы безопасности жизнедеятельности', subSubject: 'Основам безопасности жизнедеятельности', icon: '/family.png' as string },
  { subject: 'Основы экономики', subSubject: 'Основам экономики', icon: '/economy.png' as string },
  { subject: 'Правоведение', subSubject: 'Правоведению', icon: '/pravo.png' as string },
  { subject: 'Природоведение', subSubject: 'Природоведению', icon: '/tree.png' as string },
  { subject: 'Рисование', subSubject: 'Рисованию', icon: '/art.png' as string },
  { subject: 'Родная литература', subSubject: 'Родной литературе', icon: '/books.png' as string },
  { subject: 'Технология', subSubject: 'Технологии', icon: '/hammer.png' as string },
  { subject: 'Труд', subSubject: 'Труду', icon: '/hammer.png' as string },
  { subject: 'Физика', subSubject: 'Физике', icon: '/biology.png' as string },
  { subject: 'Физкультура', subSubject: 'Физкультуре', icon: '/ball.png' as string },
  { subject: 'Философия', subSubject: 'Философии', icon: '/books.png' as string },
  { subject: 'Химия', subSubject: 'Химии', icon: '/chemistry.png' as string },
  { subject: 'Хореография', subSubject: 'Хореографии', icon: '/choreography.png' as string },
  { subject: 'Черчение', subSubject: 'Черчению', icon: '/drawing.png' as string },
  { subject: 'Чтение', subSubject: 'Чтению', icon: '/books.png' as string },
  { subject: 'Экология', subSubject: 'Экологии', icon: '/ecology.png' as string },
] as const

export const daysArray = [
  ['Понедельник', 'Пн'],
  ['Вторник', 'Вт'],
  ['Среда', 'Ср'],
  ['Четверг', 'Чт'],
  ['Пятница', 'Пт'],
  ['Суббота', 'Сб'],
] as const
export const dateDaysArray = [
  'Воскресенье',
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
] as const
export const monthsArray = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
] as const