import React from 'react';

export default function breakStringLine(stringToBreak: string) {
  const breakedString = stringToBreak
    .split('/n')
    .map(splittedString => <p>{splittedString}</p>);
  return breakedString;
}
