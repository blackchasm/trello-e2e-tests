import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://trello.com/');
  await page.getByTestId('bignav').getByRole('link', { name: 'Log in' }).click();
  await page.getByPlaceholder('Укажите адрес электронной почты').click();
  await page.getByPlaceholder('Укажите адрес электронной почты').fill('blackchasmfel@gmail.com');
  await page.getByRole('button', { name: 'Продолжить' }).click();
  await page.getByPlaceholder('Введите пароль').click();
  await page.getByPlaceholder('Введите пароль').fill('Cherrycola1980');
  await page.getByPlaceholder('Введите пароль').press('Enter');
  await page.getByPlaceholder('Введите пароль').click({
    clickCount: 3
  });
  await page.getByPlaceholder('Введите пароль').fill('Cherrytest1980');
  await page.getByRole('button', { name: 'Войти', exact: true }).click();
  await page.getByRole('link', { name: 'FOR OTUS ' }).click();
  await page.getByRole('link', { name: ' Добавить карточку' }).first().click();
  await page.getByPlaceholder('Ввести заголовок для этой карточки').fill('Cooldown');
  await page.getByRole('button', { name: 'Добавить карточку' }).click();
  await page.getByRole('link', { name: ' Cooldown' }).click();
  await page.getByText('ДействияПоказать подробностиСкрыть подробности').click();
  await page.getByTestId('card-back-new-comment-input-skeleton').click();
  await page.getByRole('textbox', { name: 'Main content area, start typing to enter text.' }).fill('\n');
  await page.getByRole('textbox', { name: 'Main content area, start typing to enter text.' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Main content area, start typing to enter text.' }).fill('Текст, который отслеживает эту карточку');
  await page.getByTestId('card-back-comment-save-button').click();
  await page.getByRole('button', { name: 'Закрыть диалоговое окно' }).click();
  await page.getByRole('link', { name: ' Cooldown   1' }).click();
  await page.getByRole('button', { name: 'Закрыть диалоговое окно' }).click();
  await page.getByRole('link', { name: ' Cooldown   1' }).click();
  await page.getByRole('button', { name: 'Вы подписаны на уведомления об обновлениях этой карточки. Нажмите, чтобы отменить подписку.' }).click();
  await page.getByRole('button', { name: 'Подпишитесь на уведомления об обновлениях этой карточки' }).click();
  await page.getByRole('button', { name: 'Вы подписаны на уведомления об обновлениях этой карточки. Нажмите, чтобы отменить подписку.' }).click();
  await page.getByRole('button', { name: 'Закрыть диалоговое окно' }).click();
  await page.getByRole('link', { name: 'Cooldown  1' }).click();
  await page.getByRole('link', { name: ' Архивация' }).click();
  await page.getByRole('link', { name: ' Вернуть' }).click();
  await page.getByRole('link', { name: ' Архивация' }).click();
  await page.getByTestId('card-back-archive-banner').click();
  await page.getByRole('link', { name: ' Удалить' }).click();
  await page.getByRole('button', { name: 'Удалить' }).click();
});