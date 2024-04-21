import soapRequest from 'easy-soap-request';
import { parseStringPromise } from 'xml2js';
import 'dotenv/config';

const SOAP_USER = process.env.SOAP_USER;
const SOAP_PASSWORD = process.env.SOAP_PASSWORD;
const SOAP_IP = process.env.SOAP_IP;
const SOAP_PORT = process.env.SOAP_PORT;
const SOAP_URL = `http://${SOAP_USER}:${SOAP_PASSWORD}@${SOAP_IP}:${SOAP_PORT}/`;

// SOAP server details
const url = SOAP_URL;
const headers = {
  'Content-Type': 'text/xml;charset=UTF-8',
  'Authorization': 'Basic ' + Buffer.from(`${SOAP_USER}:${SOAP_PASSWORD}`).toString('base64')
};

class SoapClient {
  constructor(purchase) {
    this.purchase = purchase;
  }

  async xml_build() {
    const xml = `<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/1999/XMLSchema-instance" xmlns:xsd="http://www.w3.org/1999/XMLSchema">
      <SOAP-ENV:Body>
        <ns1:executeCommand xmlns:ns1="urn:AC">
          <command>send items ${this.purchase.character} "Your Purchase" "Have a great day!" ${this.purchase.id}:${this.purchase.quantity}</command>
        </ns1:executeCommand>
      </SOAP-ENV:Body>
    </SOAP-ENV:Envelope>`;
    
    return xml;
  }
  
  async sendItem() {
    try {
      const xml = this.xml_build();
      const { response } = await soapRequest({ url: url, headers: headers, xml: await xml, timeout: 1000, method: 'POST' }, { verbose: true});
      const { body, statusCode } = response;
      console.log('Status code:', statusCode);
      parseStringPromise(body).then(result => {
        const resultContent = result["SOAP-ENV:Envelope"]["SOAP-ENV:Body"][0]["ns1:executeCommandResponse"][0].result[0];
        console.log('Item sent response:', resultContent);
        return `<div class="text-green-500">${resultContent}</div>`
      }).catch(parseError => {
        console.error('Parsing error:', parseError);
      });
    } catch (error) {
      console.error('SOAP request error:', error);
    }
  }  
}

export default SoapClient;

