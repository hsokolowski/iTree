export function getAllClasses(set, cattegoryAttr) {
  let array = [];
  set.forEach(element => {
    let _class = element[cattegoryAttr];
    if (!array.includes(_class)) array.push(_class);
  });
  console.log(array);
  return array;
}
