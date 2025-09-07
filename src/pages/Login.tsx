import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { useSession } from '@/contexts/SessionContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { KaiaAvatar } from '@/components/KaiaAvatar';

const Login = () => {
  const { session } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      navigate('/dashboard');
    }
  }, [session, navigate]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 font-sans">
      <main className="w-full max-w-md mx-auto flex flex-col items-center text-center">
        <KaiaAvatar />
        <h1 className="mt-6 text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-neon-cyan">
          VeggieMind
        </h1>
        <p className="mt-2 mb-8 text-lg text-foreground/80">
          Tu chef personal de nutrición vegana.
        </p>
        <div className="w-full">
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={[]}
            theme="dark"
            localization={{
              variables: {
                sign_in: {
                  email_label: 'Correo electrónico',
                  password_label: 'Contraseña',
                  button_label: 'Iniciar sesión',
                  social_provider_text: 'Iniciar sesión con {{provider}}',
                  link_text: '¿Ya tienes una cuenta? Inicia sesión',
                },
                sign_up: {
                  email_label: 'Correo electrónico',
                  password_label: 'Contraseña',
                  button_label: 'Registrarse',
                  social_provider_text: 'Registrarse con {{provider}}',
                  link_text: '¿No tienes una cuenta? Regístrate',
                },
                forgotten_password: {
                  email_label: 'Correo electrónico',
                  button_label: 'Enviar instrucciones',
                  link_text: '¿Olvidaste tu contraseña?',
                },
              },
            }}
          />
        </div>
      </main>
    </div>
  );
};

export default Login;