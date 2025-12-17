import { TItem } from "../utils/types";
export const categories = [
  "Категория 1",
  "Категория 2",
  "Категория 3",
  "Категория 4",
  "Категория 5",
];

export const generateDateBasedId = (): string => {
  const date = new Date();
  const dateStr = date.toISOString().slice(0, 10).replace(/-/g, "");
  const random = Math.floor(Math.random() * 1000);
  return `${dateStr}-${random}`;
};

export const getFallbackData = (): TItem[] => {
  const currentDate = new Date().toLocaleDateString("ru-RU");

  return [
    {
      id: generateDateBasedId(),
      title: "Заявка 1",
      category: "Категория 1",
      date: currentDate,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: generateDateBasedId(),
      title: "Заявка 2",
      category: "Категория 2",
      date: currentDate,
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      id: generateDateBasedId(),
      title: "Заявка 3",
      category: "Категория 3",
      date: currentDate,
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    },
    {
      id: generateDateBasedId(),
      title: "Заявка 4",
      category: "Категория 4",
      date: currentDate,
      description:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      id: generateDateBasedId(),
      title: "Заявка 5",
      category: "Категория 5",
      date: currentDate,
      description:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
    },
    {
      id: generateDateBasedId(),
      title: "Заявка 6",
      category: "Категория 1",
      date: currentDate,
      description:
        "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.",
    },
    {
      id: generateDateBasedId(),
      title: "Заявка 7",
      category: "Категория 2",
      date: currentDate,
      description:
        "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
    },
    {
      id: generateDateBasedId(),
      title: "Заявка 8",
      category: "Категория 3",
      date: currentDate,
      description:
        "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
    },
    {
      id: generateDateBasedId(),
      title: "Заявка 9",
      category: "Категория 4",
      date: currentDate,
      description:
        "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque.",
    },
    {
      id: generateDateBasedId(),
      title: "Заявка 10",
      category: "Категория 5",
      date: currentDate,
      description:
        "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi.",
    },
  ];
};
