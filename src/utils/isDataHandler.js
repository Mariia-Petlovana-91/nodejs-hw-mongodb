import createHttpError from 'http-errors';
export const isDataHandler = (data) => {
  if (!data) {
    throw createHttpError(404, 'Contact not found');

    // (якщо треба вручну написати без бібліотеки,щоб змінювати статус використовуємо деструктуризацію у сервeрі і статус замінюється динамічно)
    // const error = new Error("Contact not found");
    // error.status = 404;
    // throw error;
  }
};
