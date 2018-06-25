export enum Role {none, user, manager, admin};

export class User {
  // public username: string;
  // public readonly id: number;
  // public role: Role;

  constructor(public username: string,
              public readonly id: number,
              public role: Role){}
}
