import { MongoClient } from 'mongodb'

enum DB_NAMES {
	REGISTRATION = 'newsletter_registration',
	EVENT = 'events',
}

enum DB_COLLECTIONS {
	EMAILS = 'emails',
	COMMENT = 'comments',
	EVENT = 'events',
}

const dbUser = 'mongoadmin'
const dbPass = 'biZNfJDEL7dMzWgq'

const buildConnectionString = (dbName: DB_NAMES) =>
	`mongodb+srv://${dbUser}:${dbPass}@cluster0.dbejtkw.mongodb.net/${dbName}?retryWrites=true&w=majority`

async function dbInsertOne(
	dbName: DB_NAMES,
	dbCollection: DB_COLLECTIONS,
	objectToSave: any
) {
	const client = await MongoClient.connect(buildConnectionString(dbName))
	const db = client.db()
	await db.collection(dbCollection).insertOne(objectToSave)
	client.close()
}

async function dbGetRecords(
	dbName: DB_NAMES,
	dbCollection: DB_COLLECTIONS,
	filter: {} = {}
) {
	const client = await MongoClient.connect(buildConnectionString(dbName))
	const db = client.db()
	const documents = await db
		.collection(dbCollection)
		.find(filter)
		.sort({ _id: -1 })
		.toArray()
	client.close()
	return documents
}

export async function saveNewsletterRegistration(email: string) {
	dbInsertOne(DB_NAMES.REGISTRATION, DB_COLLECTIONS.EMAILS, { email })
}

export async function saveComment(
	email: string,
	name: string,
	comment: string,
	eventId: string
) {
	dbInsertOne(DB_NAMES.EVENT, DB_COLLECTIONS.COMMENT, {
		email,
		name,
		comment,
		eventId,
	})
}

export async function getCommentsForEvent(eventId: string) {
	return await dbGetRecords(DB_NAMES.EVENT, DB_COLLECTIONS.COMMENT, { eventId })
}
