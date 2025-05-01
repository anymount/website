import { supabase } from '../lib/supabase';
import { groupsData, groupDetails } from '../data/groupsData';

const migrateData = async () => {
  console.log('Iniciando migração dos dados...');

  try {
    // Inserir grupos
    for (const group of groupsData) {
      console.log(`Migrando grupo ${group.name}...`);
      
      const { data: groupData, error: groupError } = await supabase
        .from('groups')
        .insert({
          name: group.name,
          description: group.description,
          long_description: groupDetails[group.id]?.longDescription || null,
          members: group.members,
          price: group.price,
          image_url: group.imageUrl,
          category: group.category,
          telegram_link: groupDetails[group.id]?.telegramLink || '',
          content_count: groupDetails[group.id]?.contentCount || null,
          active: true
        })
        .select()
        .single();

      if (groupError) {
        console.error('Erro ao inserir grupo:', JSON.stringify(groupError, null, 2));
        throw groupError;
      }

      // Inserir features do grupo
      const features = groupDetails[group.id]?.features || [];
      if (features.length > 0) {
        console.log(`Migrando ${features.length} features para o grupo ${group.name}...`);
        
        const { error: featuresError } = await supabase
          .from('group_features')
          .insert(
            features.map(feature => ({
              group_id: groupData.id,
              feature
            }))
          );

        if (featuresError) {
          console.error('Erro ao inserir features:', JSON.stringify(featuresError, null, 2));
          throw featuresError;
        }
      }

      // Inserir reviews do grupo
      const reviews = groupDetails[group.id]?.reviews || [];
      if (reviews.length > 0) {
        console.log(`Migrando ${reviews.length} reviews para o grupo ${group.name}...`);
        
        const { error: reviewsError } = await supabase
          .from('group_reviews')
          .insert(
            reviews.map(review => ({
              group_id: groupData.id,
              user_name: review.user,
              rating: review.rating,
              comment: review.comment
            }))
          );

        if (reviewsError) {
          console.error('Erro ao inserir reviews:', JSON.stringify(reviewsError, null, 2));
          throw reviewsError;
        }
      }

      console.log(`Grupo ${group.name} migrado com sucesso!`);
    }

    console.log('Migração concluída com sucesso!');
  } catch (error) {
    console.error('Erro durante a migração:', error);
    if (error.message) console.error('Mensagem de erro:', error.message);
    if (error.details) console.error('Detalhes do erro:', error.details);
    process.exit(1);
  }
};

// Executar a migração
migrateData(); 