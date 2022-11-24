import { test, expect } from '@playwright/test';

const { PlaywrightDevPage } = require('./docg_common_login');
//LoanID
const ticketId = "TESTP1-0475";
const notes  = "king";
const notesLoc = "p[text()=" + "'" + notes + "'"+"]";
let page;
const editNotes = "edit king";
test('Add notes in ticket', async ({ browser }) => {
 page = await browser.newPage();
  const playwrightDev = new PlaywrightDevPage(page);
   //login
   await playwrightDev.login();
   //click on loans
   await page.locator("//a[contains(text(),'Tasks')]").click();
   
   await page.waitForTimeout(2000);
   //search for loan
   await page.locator('[placeholder="Search task by task name, ticket title, ticket# or loan#"]').fill(ticketId);
   //click on the result
   await page.locator('span.ngb-highlight').click();
   //wait for loan summary to be displayed
   await expect(page.locator('span:has-text("Summary")')).toHaveText('Summary');
   //Click a[role="tab"]:has-text("Notes")
  await page.locator('a[role="tab"]:has-text("Notes")').click();

  //  Add notes
   await page.locator('p.ck-placeholder').fill(notes);
  // Click text=Post
  await page.locator('button:has-text("Post")').click();
  //Assert if notes is added
  await expect(page.locator('span', { hasText: ''+ notes +'' })).toHaveText(notes);

});

 test('Edit notes', async ({ browser })  => {
 // await expect(page.locator('span', { hasText: ''+ notes +'' })).toHaveText(notes);
  //await page.locator('text=D76L101 : The One User (Servicing Agent [Test]) 08/26/22 12:56 add/edit/delete t >> i').nth(1).click();
//  await page.locator('p:has-text: add/edit/delete the same notes to check the functionality'    >> i).click();
 //const myItemList = await page.$$('text=add/edit/delete the same notes to check the functionality');
  //console.log(myItemList);
 
  await page.locator('//' + notesLoc +  '/following::i[@class="fas fa-edit"][1]').click();
  ////p[text()="note 8 :: t2"]/following::i[@class="fas fa-edit"]
  //p[text()='king']

  await page.locator('//'+notesLoc).fill(editNotes);

await page.locator("//a[text()='Cancel']/following-sibling::button").click();
await expect(page.locator('span', { hasText: ''+ editNotes +'' })).toBeVisible();
 });

 test('Delete notes', async ({ browser })  => {

   const newNotesLoc = "p[text()=" + "'" + editNotes + "'"+"]";
   await page.locator('//' + newNotesLoc +  '/following::i[@class="far fa-trash-alt"][1]').click();
   await page.locator('//button[text()="Yes"]').click();
  await expect(page.locator('span', { hasText: ''+ editNotes +'' })).not.toBeVisible();
  });

 