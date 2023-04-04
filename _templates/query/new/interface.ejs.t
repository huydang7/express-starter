---
to: src/interfaces/<%=h.changeCase.paramCase(name)%>.ts
---

import { ITimestamp } from './base';

export interface I<%=h.changeCase.pascalCase(name)%> extends ITimestamp {
  id: string;
}
