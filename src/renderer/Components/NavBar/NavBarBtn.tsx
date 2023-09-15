import React from 'react';

interface Props {
  linkIcon: string;
  identityTab: string;
  onClickElement: (tabSelected: string) => void;
  activeClass: string;
}

function NavBarBtn({
  linkIcon,
  identityTab,
  activeClass,
  onClickElement,
}: Props) {
  return (
    <button
      className={`navBarButton mx-3 ${activeClass}`}
      type="button"
      onClick={() => {
        onClickElement(identityTab);
      }}
    >
      <img className="navBarIcons" src={linkIcon} alt="" />
    </button>
  );
}

export default NavBarBtn;
