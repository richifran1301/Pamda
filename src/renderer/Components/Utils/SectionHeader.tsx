import React from 'react';

interface Props {
  title: string;
}

function SectionHeader({ title }: Props) {
  return (
    <>
      <div className="mt-4 p-5 rounded text-center">
        <h1>{title}</h1>
        <p>Lorem ipsum...</p>
      </div>
      <hr className="headerSeparator" />
    </>
  );
}

export default SectionHeader;
