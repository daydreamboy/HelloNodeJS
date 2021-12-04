import * as React from 'react';
import styles from './index.module.css';
import {Button} from "@alifd/next";

const Menu1 = () => {
  return (
    <div className={styles.container}>
      <h1>这里是菜单对应的dashboard页面</h1>
      <Button>点击按钮</Button>
    </div>
  );
};

export default Menu1;
