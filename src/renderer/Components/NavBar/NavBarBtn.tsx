import React from 'react';

interface Props {
  linkIcon: string;
}

function NavBarBtn({ linkIcon }: Props) {
  return (
    <button
      className="navBarButton mx-3"
      type="button"
      onClick={() => console.log('Hola')}
    >
      <img className="navBarIcons" src={linkIcon} alt="" />
    </button>
  );
}

export default NavBarBtn;
