export class JogBase {
  public readonly id: number;
  public pretty_time: string;
  // public date: Date;
  public date: string;
}

export class Jog extends JogBase {
  // public readonly id: number;
  // public pretty_time: string;
  public distance: number;
  public readonly speed: number;

  // public date: Date;
}

export class BareJog extends JogBase {
  // public readonly id: number;
  // public pretty_time: string;
  // public date: Date;
  public pretty_distance: string;
}
