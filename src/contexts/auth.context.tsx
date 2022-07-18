import React, { Dispatch, SetStateAction } from 'react';

interface IContext {
	isAuth: boolean;
	setIsAuth: Dispatch<SetStateAction<boolean>>;
}

const AuthContext = React.createContext<IContext>({} as IContext);

export const AuthProvider: React.FC = ({ children }) => {
	const [isAuth, setIsAuth] = React.useState(false);

	const value = React.useMemo(
		() => ({
			isAuth,
			setIsAuth,
		}),
		[isAuth]
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => React.useContext(AuthContext);