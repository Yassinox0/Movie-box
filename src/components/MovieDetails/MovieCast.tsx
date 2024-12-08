import { CastMember } from '../../types/movie';
import { getImageUrl } from '../../services/api';

interface MovieCastProps {
  cast: CastMember[];
}

export default function MovieCast({ cast }: MovieCastProps) {
  return (
    <div className="py-12">
      <h2 className="text-2xl font-bold mb-8 text-white">Featured Cast</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {cast.slice(0, 6).map((member) => (
          <div
            key={member.id}
            className="group relative overflow-hidden rounded-lg bg-gray-800 transition-transform hover:scale-105"
          >
            <div className="aspect-[2/3]">
              <img
                src={getImageUrl(member.profile_path || '', 'original')}
                alt={member.name}
                className="w-full h-full object-cover transition-transform group-hover:scale-110"
                loading="lazy"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="font-medium text-white text-sm">{member.name}</p>
                <p className="text-gray-400 text-sm">{member.character}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}