import React, { useState, useRef, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { MenuItem } from "primereact/menuitem";
import { Avatar } from "primereact/avatar";
import { Menubar } from "primereact/menubar";
import Logo from "./logo/logo";
import "./header-nav.css";

const HeaderNav: React.FC = () => {
  const [activeSearch, setActiveSearch] = useState<boolean>(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSearch = () => {
    setActiveSearch(!activeSearch);
  };

  //Close search input if clicking outside of the search or container
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setActiveSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (activeSearch && searchRef.current) {
      searchRef.current.focus();
    }
  }, [activeSearch]);

  const items: MenuItem[] = [{ label: "TV Shows" }, { label: "Movies" }];

  const start = <Logo />;
  const end = (
    <div className="header-end" ref={containerRef}>
      {!activeSearch && (
        <i
          className="pi pi-search"
          style={{
            fontSize: "1.5rem",
            cursor: "pointer",
            color: "var(--bg-color)",
          }}
          onClick={handleSearch}
        />
      )}
      {activeSearch && (
        <InputText
          placeholder="Search"
          type="text"
          className="header-search"
          ref={searchRef}
        />
      )}
      <Avatar
        image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
        shape="circle"
      />
    </div>
  );

  return (
    <div className="header-nav">
      <Menubar
        model={items}
        start={start}
        end={end}
        className="header-nav-menu"
      />
    </div>
  );
};

export default HeaderNav;
