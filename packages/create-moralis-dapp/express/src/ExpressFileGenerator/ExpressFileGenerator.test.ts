import path from 'path';
import { ExpressAppInquirer } from '../ExpressAppInquirer';
import { ExpressFileGenerator } from './ExpressFileGenerator';

describe('ExpressFileGenerator', () => {
  const templatePath = path.join(__dirname, '../template');
  const destination = path.join(__dirname, 'moralis-dapp');

  beforeAll(() => {
    const fileGenerator = new ExpressFileGenerator(templatePath, destination);

    let data: Record<string, any> = {};

    for (let question of ExpressAppInquirer.questions) {
      data[question.name] = question?.default;
    }
    console.log('data: ', data);
    // const data = ExpressAppInquirer.questions.map((question) => {
    //   return {
    //     value: question?.default,
    //   };
    // });
    fileGenerator.build(data);
  });
  it('', () => {});
  //   function testUnit(
  //     value: AptosNativeish,
  //     unit: AptosNativeUnit | undefined,
  //     expectedAptos: string,
  //     expectedOctas: string,
  //   ) {
  //     it(`creates a value, unit: ${unit}`, () => {
  //       const native = AptosNative.create(value, unit);
  //       expect(native.aptos).toBe(expectedAptos);
  //       expect(native.octas).toBe(expectedOctas);
  //       expect(native.toString()).toBe(expectedOctas);
  //       expect(native.toJSON()).toBe(expectedOctas);
  //       expect(native.format()).toBe(expectedOctas);
  //     });
  //   }
});
