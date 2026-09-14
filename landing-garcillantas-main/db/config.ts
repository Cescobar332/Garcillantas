import { column, defineDb, defineTable, NOW} from 'astro:db';

const Registrations = defineTable({
  columns: {
    registerId: column.number({ primaryKey: true }),
    fullName: column.text(),
    email: column.text(),
    phone: column.text(),
    registrationDate: column.date({ default: NOW })
  }
})
// https://astro.build/db/config
export default defineDb({
  tables: {Registrations}
});
