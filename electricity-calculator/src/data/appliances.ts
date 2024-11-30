import { Appliance } from '../types/Appliance';

export const categories = [
  'מטבח',
  'גיימינג ומחשבים',
  'מיזוג וחימום',
  'כביסה וניקיון',
  'מולטימדיה',
  'תאורה',
  'חדר אמבטיה',
  'שונות'
];

export const defaultAppliances: Appliance[] = [
  // מכשירי גיימינג ומחשבים
  { name: 'מחשב גיימינג - High End', power: 750, hours: 4, category: 'גיימינג ומחשבים', custom: false },
  { name: 'מחשב גיימינג - Mid Range', power: 550, hours: 4, category: 'גיימינג ומחשבים', custom: false },
  { name: 'מחשב גיימינג - Entry Level', power: 450, hours: 4, category: 'גיימינג ומחשבים', custom: false },
  { name: 'PlayStation 5', power: 350, hours: 3, category: 'גיימינג ומחשבים', custom: false },
  { name: 'Xbox Series X', power: 300, hours: 3, category: 'גיימינג ומחשבים', custom: false },
  { name: 'Nintendo Switch', power: 40, hours: 3, category: 'גיימינג ומחשבים', custom: false },
  { name: 'מסך מחשב 27"', power: 35, hours: 8, category: 'גיימינג ומחשבים', custom: false },
  { name: 'מחשב נייד', power: 65, hours: 6, category: 'גיימינג ומחשבים', custom: false },

  // מכשירי מטבח
  { name: 'מקרר', power: 400, hours: 24, category: 'מטבח', custom: false },
  { name: 'מקפיא', power: 350, hours: 24, category: 'מטבח', custom: false },
  { name: 'תנור חשמלי', power: 2400, hours: 1, category: 'מטבח', custom: false },
  { name: 'מיקרוגל', power: 1200, hours: 0.5, category: 'מטבח', custom: false },
  { name: 'קומקום חשמלי', power: 2000, hours: 0.5, category: 'מטבח', custom: false },
  { name: 'מדיח כלים', power: 1800, hours: 2, category: 'מטבח', custom: false },
  { name: 'טוסטר', power: 850, hours: 0.5, category: 'מטבח', custom: false },
  { name: 'מיקסר', power: 300, hours: 0.5, category: 'מטבח', custom: false },

  // מיזוג וחימום
  { name: 'מזגן 1 כ"ס', power: 1000, hours: 8, category: 'מיזוג וחימום', custom: false },
  { name: 'מזגן 2 כ"ס', power: 2000, hours: 8, category: 'מיזוג וחימום', custom: false },
  { name: 'מזגן 3 כ"ס', power: 3000, hours: 8, category: 'מיזוג וחימום', custom: false },
  { name: 'מפזר חום', power: 2000, hours: 4, category: 'מיזוג וחימום', custom: false },
  { name: 'מאוורר תקרה', power: 75, hours: 8, category: 'מיזוג וחימום', custom: false },
  { name: 'מאוורר עמוד', power: 50, hours: 8, category: 'מיזוג וחימום', custom: false },

  // כביסה וניקיון
  { name: 'מכונת כביסה', power: 2000, hours: 2, category: 'כביסה וניקיון', custom: false },
  { name: 'מייבש כביסה', power: 3000, hours: 2, category: 'כביסה וניקיון', custom: false },
  { name: 'שואב אבק', power: 1400, hours: 1, category: 'כביסה וניקיון', custom: false },
  { name: 'מגהץ', power: 2200, hours: 1, category: 'כביסה וניקיון', custom: false },

  // מולטימדיה
  { name: 'טלוויזיה LED 55"', power: 150, hours: 5, category: 'מולטימדיה', custom: false },
  { name: 'טלוויזיה LED 65"', power: 200, hours: 5, category: 'מולטימדיה', custom: false },
  { name: 'מקרן ביתי', power: 300, hours: 3, category: 'מולטימדיה', custom: false },
  { name: 'מערכת קולנוע ביתית', power: 400, hours: 3, category: 'מולטימדיה', custom: false },
  { name: 'רמקולים', power: 100, hours: 4, category: 'מולטימדיה', custom: false },

  // תאורה
  { name: 'נורת LED', power: 10, hours: 6, category: 'תאורה', custom: false },
  { name: 'נורת פלורסנט', power: 25, hours: 6, category: 'תאורה', custom: false },
  { name: 'נורת להט', power: 60, hours: 6, category: 'תאורה', custom: false },
  { name: 'פס לד', power: 20, hours: 6, category: 'תאורה', custom: false },

  // חדר אמבטיה
  { name: 'דוד חשמל', power: 3000, hours: 3, category: 'חדר אמבטיה', custom: false },
  { name: 'מייבש שיער', power: 1800, hours: 0.5, category: 'חדר אמבטיה', custom: false },
  { name: 'מחליף אוויר', power: 25, hours: 2, category: 'חדר אמבטיה', custom: false },

  // שונות
  { name: 'ראוטר WiFi', power: 20, hours: 24, category: 'שונות', custom: false },
  { name: 'טלפון נייד (טעינה)', power: 15, hours: 3, category: 'שונות', custom: false },
  { name: 'משאבת בריכה', power: 750, hours: 8, category: 'שונות', custom: false },
  { name: 'מערכת השקיה', power: 100, hours: 1, category: 'שונות', custom: false },
  { name: 'מטהר אוויר', power: 45, hours: 12, category: 'שונות', custom: false },
];
