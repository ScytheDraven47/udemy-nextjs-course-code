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

const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASS

const buildConnectionString = (dbName: DB_NAMES) =>
	`mongodb+srv://${dbUser}:${dbPass}@cluster0.dbejtkw.mongodb.net/${dbName}?retryWrites=true&w=majority`

const connect = async (dbName: DB_NAMES) =>
	await MongoClient.connect(buildConnectionString(dbName))

async function dbInsertDocument(
	dbName: DB_NAMES,
	dbCollection: DB_COLLECTIONS,
	document: {}
) {
	let client
	let result

	try {
		client = await connect(dbName)
	} catch (error) {
		return { error }
	}

	try {
		const db = client.db()
		const insertedId = await db
			.collection(dbCollection)
			.insertOne(document)
			.then((res) => res.insertedId.toString())
		result = { error: false, insertedId }
	} catch (error) {
		result = { error }
	}
	// client.close()
	return result
}

async function dbGetRecords(
	dbName: DB_NAMES,
	dbCollection: DB_COLLECTIONS,
	filter: {} = {}
) {
	let client
	let result

	try {
		client = await connect(dbName)
	} catch (error) {
		return { error }
	}

	try {
		const db = client.db()
		const documents = await db
			.collection(dbCollection)
			.find(filter)
			.sort({ _id: -1 })
			.toArray()
		result = { error: false, documents }
	} catch (error) {
		result = { error }
	}
	// client.close()
	return result
}

export async function saveNewsletterRegistration(email: string) {
	return await dbInsertDocument(DB_NAMES.REGISTRATION, DB_COLLECTIONS.EMAILS, {
		email,
	})
}

export async function saveComment(
	email: string,
	name: string,
	comment: string,
	eventId: string
) {
	return await dbInsertDocument(DB_NAMES.EVENT, DB_COLLECTIONS.COMMENT, {
		email,
		name,
		comment,
		eventId,
	})
}

export async function getCommentsForEvent(eventId: string) {
	return await dbGetRecords(DB_NAMES.EVENT, DB_COLLECTIONS.COMMENT, { eventId })
}
