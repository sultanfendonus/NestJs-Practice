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

export const calculateTime = () => {
  return function (target, key, descriptor) {
    const originalFunc = descriptor.value;
    console.time('key');
    originalFunc.bind(target);
    console.timeEnd('key');
  };
};
