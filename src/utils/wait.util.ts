import { RESPONSE_TIMEOUT } from '@_pw-config';
import { Page, Response } from '@playwright/test';

// export async function waitForResponse(
// page: Page,
// url: string,
// ): Promise<Response> {
// return page.waitForResponse(url, {
// timeout: RESPONSE_TIMEOUT,
// });
// }

export async function waitForResponse(
  page: Page,
  url: string,
  method: string,
  status: number,
): Promise<Response> {
  return page.waitForResponse(
    (response) => {
      // console.log(
      // response.request().method(),
      // response.url(),
      // response.status(),
      // );
      return (
        // check if response url includes url
        response.url().includes(url) &&
        // check if response method is equal to method
        response.status() == status &&
        // check if response status is equal to status
        response.request().method() == method
      );
    },
    {
      timeout: RESPONSE_TIMEOUT,
    },
  );
}
