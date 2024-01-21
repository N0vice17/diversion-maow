import { Button, Link, TextField } from "@mui/material";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.card}>
        <div className={styles.card_main}>
          <TextField type="tel" id="adhar_number" label="adhar number" variant="outlined" />
          <TextField type="tel" id="phone_number" label="phone number" variant="outlined" />
        </div>
        <Button><Link href="check">next</Link></Button>
      </div>
    </main>
  );
}
