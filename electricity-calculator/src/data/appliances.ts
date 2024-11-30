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
  { name: 'מחשב גיימינג - High End', power: 750, hours: 4, category: 'גיימינג ומחשבים' },
  { name: 'מחשב גיימינג - Mid Range', power: 550, hours: 4, category: 'גיימינג ומחשבים' },
  { name: 'מחשב גיימינג - Entry Level', power: 450, hours: 4, category: 'גיימינג ומחשבים' },
  { name: 'PlayStation 5', power: 350, hours: 3, category: 'גיימינג ומחשבים' },
  { name: 'PlayStation 4 Pro', power: 310, hours: 3, category: 'גיימינג ומחשבים' },
  { name: 'PlayStation 4', power: 250, hours: 3, category: 'גיימינג ומחשבים' },
  { name: 'Xbox Series X', power: 315, hours: 3, category: 'גיימינג ומחשבים' },
  { name: 'Xbox Series S', power: 250, hours: 3, category: 'גיימינג ומחשבים' },
  { name: 'Xbox One X', power: 245, hours: 3, category: 'גיימינג ומחשבים' },
  { name: 'Xbox One S', power: 190, hours: 3, category: 'גיימינג ומחשבים' },
  { name: 'Nintendo Switch (Docked)', power: 18, hours: 3, category: 'גיימינג ומחשבים' },
  { name: 'מסך גיימינג 27" 144Hz', power: 35, hours: 4, category: 'גיימינג ומחשבים' },
  { name: 'מסך גיימינג 32" 165Hz', power: 45, hours: 4, category: 'גיימינג ומחשבים' },
  { name: 'מסך גיימינג 34" Ultrawide', power: 55, hours: 4, category: 'גיימינג ומחשבים' },

  // מכשירי מטבח
  { name: 'מקרר', power: 400, hours: 24, category: 'מטבח' },
  { name: 'מקפיא', power: 350, hours: 24, category: 'מטבח' },
  { name: 'מדיח כלים', power: 1200, hours: 1, category: 'מטבח' },
  { name: 'תנור אפייה', power: 2400, hours: 1, category: 'מטבח' },
  { name: 'מיקרוגל', power: 1000, hours: 0.5, category: 'מטבח' },
  { name: 'קומקום חשמלי', power: 2000, hours: 0.5, category: 'מטבח' },
  { name: 'טוסטר', power: 850, hours: 0.25, category: 'מטבח' },
  { name: 'מיקסר', power: 300, hours: 0.5, category: 'מטבח' },
  { name: 'מעבד מזון', power: 400, hours: 0.5, category: 'מטבח' },
  { name: 'מכונת קפה', power: 1000, hours: 0.5, category: 'מטבח' },

  // מיזוג וחימום
  { name: 'מזגן (1 כ"ס)', power: 1000, hours: 8, category: 'מיזוג וחימום' },
  { name: 'מזגן (2 כ"ס)', power: 2000, hours: 8, category: 'מיזוג וחימום' },
  { name: 'מזגן (2.5 כ"ס)', power: 2500, hours: 8, category: 'מיזוג וחימום' },
  { name: 'תנור חימום', power: 2000, hours: 3, category: 'מיזוג וחימום' },
  { name: 'מאוורר תקרה', power: 75, hours: 8, category: 'מיזוג וחימום' },
  { name: 'מאוורר עמוד', power: 50, hours: 8, category: 'מיזוג וחימום' },

  // כביסה וניקיון
  { name: 'מכונת כביסה', power: 500, hours: 2, category: 'כביסה וניקיון' },
  { name: 'מייבש כביסה', power: 3000, hours: 1.5, category: 'כביסה וניקיון' },
  { name: 'שואב אבק', power: 1400, hours: 0.5, category: 'כביסה וניקיון' },
  { name: 'מגהץ', power: 1800, hours: 0.5, category: 'כביסה וניקיון' },

  // מולטימדיה ובידור
  { name: 'טלוויזיה LED 43"', power: 100, hours: 4, category: 'מולטימדיה' },
  { name: 'טלוויזיה LED 55"', power: 120, hours: 4, category: 'מולטימדיה' },
  { name: 'טלוויזיה LED 65"', power: 150, hours: 4, category: 'מולטימדיה' },
  { name: 'מחשב נייח רגיל', power: 200, hours: 4, category: 'מולטימדיה' },
  { name: 'מחשב נייד', power: 65, hours: 4, category: 'מולטימדיה' },
  { name: 'מערכת קולנוע ביתית', power: 150, hours: 2, category: 'מולטימדיה' },
  { name: 'ראוטר WiFi', power: 10, hours: 24, category: 'מולטימדיה' },

  // תאורה
  { name: 'נורת LED 10W', power: 10, hours: 6, category: 'תאורה' },
  { name: 'נורת LED 15W', power: 15, hours: 6, category: 'תאורה' },
  { name: 'נורת פלורסנט', power: 25, hours: 6, category: 'תאורה' },
  { name: 'נורת ליבון', power: 60, hours: 6, category: 'תאורה' },
  { name: 'פס לד', power: 20, hours: 6, category: 'תאורה' },
  { name: 'תאורת גינה', power: 50, hours: 6, category: 'תאורה' },

  // חדר אמבטיה
  { name: 'דוד חשמל', power: 3000, hours: 3, category: 'חדר אמבטיה' },
  { name: 'מייבש שיער', power: 1800, hours: 0.25, category: 'חדר אמבטיה' },
  { name: 'מחליף אוויר', power: 25, hours: 2, category: 'חדר אמבטיה' },
  { name: 'תנור אמבטיה', power: 2000, hours: 1, category: 'חדר אמבטיה' },

  // שונות
  { name: 'משאבת בריכה', power: 750, hours: 8, category: 'שונות' },
  { name: 'מערכת השקיה', power: 100, hours: 1, category: 'שונות' },
  { name: 'מטהר אוויר', power: 45, hours: 12, category: 'שונות' },
];
