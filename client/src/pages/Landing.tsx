

export default function Landing() {
    return (
        <div className="flex flex-col w-screen h-screen min-h-screen items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white p-10 relative">
            
            <div className="flex flex-col items-center mt-24">
                        <span className="px-4 py-1 rounded-full bg-white/10 text-cyan-200 mb-6 border border-cyan-400/30 text-sm font-medium">Jump In & Start Chatting</span>
                        <h1 className="text-4xl sm:text-6xl font-extrabold text-center mb-2">
                            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400">Chat App</span>
                        </h1>
                        <p className="text-lg sm:text-xl text-white/80 text-center max-w-xl mb-8">
                            Meet new people, share ideas, and connect instantly in a beautiful, real-time chat experience.<br />
                            Ready to join the conversation? Sign up or log in below and start chatting now!
                        </p>
                <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md justify-center mt-4">
                    <a
                        href="/signup"
                        className="bg-gradient-to-r from-cyan-500 to-green-400 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:from-cyan-600 hover:to-green-500 transition-all duration-200 w-full sm:w-auto text-center"
                    >
                        Sign Up
                    </a>
                    <a
                        href="/login"
                        className="bg-white/10 border border-cyan-400/30 text-cyan-200 font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-cyan-500/20 hover:text-white transition-all duration-200 w-full sm:w-auto text-center"
                    >
                        Login
                    </a>
                </div>
                {/* <div className="flex gap-4 mt-10 text-white/70">
                    <a href="#" className="hover:text-white"><svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="currentColor" /></svg></a>
                    <a href="#" className="hover:text-white"><svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-7 19h-3v-7h3v7zm-1.5-8.25c-.97 0-1.75-.78-1.75-1.75s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.75-1.75 1.75zm13.5 8.25c0 2.21-1.79 4-4 4h-14c-2.21 0-4-1.79-4-4v-14c0-2.21 1.79-4 4-4h14c2.21 0 4 1.79 4 4v14z" fill="currentColor" /></svg></a>
                    <a href="#" className="hover:text-white"><svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.59-2.46.7a4.3 4.3 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04A4.28 4.28 0 0 0 16.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.11.99C7.69 8.99 4.07 7.13 1.64 4.15c-.37.64-.58 1.38-.58 2.17 0 1.5.76 2.82 1.92 3.6a4.28 4.28 0 0 1-1.94-.54v.05c0 2.1 1.5 3.85 3.5 4.25-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.7 2.1 2.94 3.95 2.97A8.6 8.6 0 0 1 2 19.54c-.63 0-1.25-.04-1.86-.11A12.13 12.13 0 0 0 7.29 21.5c8.29 0 12.83-6.87 12.83-12.83 0-.2 0-.41-.01-.61A9.18 9.18 0 0 0 24 4.59a8.6 8.6 0 0 1-2.54.7z" fill="currentColor" /></svg></a>
                </div> */}
                <div className="mt-8 text-white/60 text-xs">&copy; {new Date().getFullYear()} Chat App. All rights reserved.</div>
            </div>
        </div>
    );
}
