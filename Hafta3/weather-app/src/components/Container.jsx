import React, { useEffect, useState } from "react";
import Filter from "./Filter";
import List from "./List";
import axios from "axios"

function Container() {
  
  return (
    <div>
      <Filter />
      <List />
    </div>
  );
}

export default Container;