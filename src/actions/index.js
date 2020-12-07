export const setOnSort = boolean => {
  return {
    type: 'ON_SORT',
    payload: boolean,
  };
};

export const setBubbleColor = color => {
  return {
    type: 'BUBBLE_COLOR',
    payload: color,
  };
};

export const setQuickColor = color => {
  return {
    type: 'QUICK_COLOR',
    payload: color,
  };
};

export const setMergeColor = color => {
  return {
    type: 'MERGE_COLOR',
    payload: color,
  };
};
