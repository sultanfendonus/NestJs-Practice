export function first(value: string) {
  console.log(`first(): factory evaluated - ${value}`);
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    console.log('on the fly');
  };
}
