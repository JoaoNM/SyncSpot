"use client";

import { FC, ReactNode, useMemo } from "react";
import {
	AnalyticsProvider,
	AuthProvider,
	FirebaseAppProvider,
	FirestoreProvider,
	useFirebaseApp,
	DatabaseProvider,
} from "reactfire";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { isBrowser } from "@/lib/utils";
import { getAnalytics } from "firebase/analytics";
import { FirebaseOptions } from "firebase/app";
import { getDatabase } from "firebase/database";

const config: FirebaseOptions = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
	measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const FirebaseProviderSDKs: FC<{ children: ReactNode }> = ({ children }) => {
	const firebase = useFirebaseApp();
	// we have to use getters to pass to providers, children should use hooks
	const auth = useMemo(() => getAuth(), []);
	const firestore = useMemo(() => getFirestore(firebase), []);
	const database = useMemo(() => getDatabase(firebase), []);
	const analytics = useMemo(() => isBrowser() && getAnalytics(firebase), []);

	return (
		<>
			{auth && (
				<AuthProvider sdk={auth}>
					<FirestoreProvider sdk={firestore}>
						<DatabaseProvider sdk={database}>
							{/* we can only use analytics in the browser */}
							{analytics ? (
								<AnalyticsProvider sdk={analytics}>
									{children}
								</AnalyticsProvider>
							) : (
								<>{children}</>
							)}
						</DatabaseProvider>
					</FirestoreProvider>
				</AuthProvider>
			)}
		</>
	);
};

export const MyFirebaseProvider: FC<{ children: ReactNode }> = ({
	children,
}) => {
	return (
		<>
			<FirebaseAppProvider firebaseConfig={config}>
				<FirebaseProviderSDKs>{children}</FirebaseProviderSDKs>
			</FirebaseAppProvider>
		</>
	);
};
