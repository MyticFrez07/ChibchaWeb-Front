import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-json-to-xml',
  templateUrl: './json-to-xml.component.html',
  styleUrls: ['./json-to-xml.component.scss']
})
export class JsonToXmlComponent {
  @Input('jsonData') jsonData: any;
  @ViewChild('xmlOutput') xmlOutputRef: ElementRef;
  xmlData: string;
  xmlOutput: string = '';

  convertToJson(): void {
    try {
      const jsonObject = (this.jsonData);
      this.xmlOutput = this.jsonToXml(jsonObject);
      console.log(this.xmlOutput)
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  }

  printXml(): void {
    this.convertToJson()
    console.log(this.xmlOutput.toString());
  }

  downloadXml(): void {
    this.convertToJson()
    const blob = new Blob([this.xmlOutput], { type: 'application/xml' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'output.xml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  private jsonToXml(json: any, parentKey: string = ''): string {
    let result = '';
    for (const key in json) {
      if (json.hasOwnProperty(key)) {
        const formattedKey = /^\d/.test(key) ? `item${key}` : key;
        const xmlKey = parentKey ? `${parentKey}_${formattedKey}` : formattedKey;
        if (json[key] !== undefined && json[key] !== null) {
          result += `<${xmlKey}>${typeof json[key] === 'object' ? this.jsonToXml(json[key], xmlKey) : json[key]}</${xmlKey}>`;
        }
      }
    }
    return result;
  }
}
