export type Item = {
  id: number;
  title: string;
  cuisine: string;
  prepTime: number;
  description: string;
};

export const items: Item[] = [
  {
    id: 1,
    title: 'Pasta mit Tomatensauce',
    cuisine: 'Italienisch',
    prepTime: 25,
    description: 'Eine einfache Pasta als Beispiel für eine Detailseite.',
  },
  {
    id: 2,
    title: 'Gemüse-Curry',
    cuisine: 'Indisch',
    prepTime: 35,
    description: 'Ein würziges Curry mit Gemüse und Reis.',
  },
  {
    id: 3,
    title: 'Tacos',
    cuisine: 'Mexikanisch',
    prepTime: 20,
    description: 'Schnelle Tacos mit frischen Zutaten.',
  },
  {
    id: 4,
    title: 'Sushi Bowl',
    cuisine: 'Japanisch',
    prepTime: 30,
    description: 'Eine Bowl im Sushi-Stil mit Reis und Gemüse.',
  },
  {
    id: 5,
    title: 'Falafel Wrap',
    cuisine: 'Orientalisch',
    prepTime: 15,
    description: 'Ein schneller Wrap mit Falafel und Salat.',
  },
];

export async function getItems() {
  return items;
}

export async function getItem(id: string) {
  return items.find((item) => item.id === Number(id));
}
