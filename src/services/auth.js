import { supabase } from '@/supabase/client';

const signLogin = async ( email, password ) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
        console.log(error);
        return;
    }
}

const logout = async () => {
    await supabase.auth.signOut();
};

const getUserSession = async () => {
    await supabase.auth.session();
};

export default { signLogin, logout, getUserSession };