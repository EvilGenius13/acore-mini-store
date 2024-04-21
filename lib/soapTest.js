// This is a single file test that can be run to debug your connection to the soap server.
// Run it by `bun run soapTest.js`

import soapRequest from 'easy-soap-request';
import { parseStringPromise } from 'xml2js';

// SOAP server details
const url = 'http://username:password@ip:port/';  // UPDATE WITH YOUR SERVER INFO
const headers = {
  'Content-Type': 'text/xml;charset=UTF-8',
  'Authorization': 'Basic ' + Buffer.from('username:password').toString('base64') // UPDATE WITH YOUR SERVER INFO
};

// SOAP XML body for fetching server status
const xml = `<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/1999/XMLSchema-instance" xmlns:xsd="http://www.w3.org/1999/XMLSchema">
  <SOAP-ENV:Body>
    <ns1:executeCommand xmlns:ns1="urn:AC">
      <command>server info</command>
    </ns1:executeCommand>
  </SOAP-ENV:Body>
</SOAP-ENV:Envelope>`;

// Send SOAP request and handle response
async function fetchServerStatus() {
  try {
    const response = await soapRequest({
      url: url,
      headers: headers,
      xml: xml,
      timeout: 1000,
      method: 'POST'
    }, { verbose: true });  // Adding verbose to help debug in the event of an issue

    const { body, statusCode } = response.response;
    console.log('Status code:', statusCode);
    parseStringPromise(body).then(result => {
      console.log('Server status:', result);
    }).catch(parseError => {
      console.error('Parsing error:', parseError);
    });
  } catch (error) {
    console.error('SOAP request error:', error);
  }
}


fetchServerStatus();
