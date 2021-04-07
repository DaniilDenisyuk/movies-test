export const parseRecord = (record) => {
  const keys = Object.keys(record);
  const nums = new Array(keys.length);
  const data = new Array(keys.length);
  let i = 0;
  for (const key of keys) {
    data[i] = record[key];
    nums[i] = `$${++i}`;
  }
  const fields = keys.join(", ");
  const params = nums.join(", ");
  return { data, fields, params };
};
