import { ReactNode } from 'react';

interface Props {
  title: string;
  children: ReactNode;
}

function SectionHeader({ title, children }: Props) {
  return (
    <>
      <div className="mt-4 p-4 rounded text-center">
        <h1>{title}</h1>
        {children}
      </div>
      <hr className="headerSeparator" />
    </>
  );
}

export default SectionHeader;
