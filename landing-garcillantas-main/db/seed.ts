import { db, Registrations } from 'astro:db';

// https://astro.build/db/seed
export default async function () {
	await db.insert(Registrations).values([
		{ fullName: "Kasim", email: "kasim@gmail.com", phone: "1234567890", registrationDate: new Date().toISOString() },
		{ fullName: "Mina", email: "mina@gmail.com", phone: "1234567890", registrationDate: new Date().toISOString() },
		{ fullName: "Maria", email: "maria@gmail.com", phone: "1234567890", registrationDate: new Date().toISOString() },
		{ fullName: "Pedro", email: "pedro@gmail.com", phone: "1234567890", registrationDate: new Date().toISOString() },
		{ fullName: "Juan", email: "juan@gmail.com", phone: "1234567890", registrationDate: new Date().toISOString() },
	]);
}