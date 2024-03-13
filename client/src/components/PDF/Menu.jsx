import React, { useEffect } from "react";
import { MDCMenu } from "@material/menu";

const Menu = () => {
  useEffect(() => {
    const menu = new MDCMenu(document.querySelector(".mdc-menu"));
    menu.open = true;
  }, []);
  return (
    <div>
      <div class="mdc-menu mdc-menu-surface">
        <ul
          class="mdc-list"
          role="menu"
          aria-hidden="true"
          aria-orientation="vertical"
          tabindex="-1"
        >
          <li class="mdc-list-item" role="menuitem">
            <span class="mdc-list-item__ripple"></span>
            <span class="mdc-list-item__text">A Menu Item</span>
          </li>
          <li class="mdc-list-item" role="menuitem">
            <span class="mdc-list-item__ripple"></span>
            <span class="mdc-list-item__text">Another Menu Item</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Menu;
